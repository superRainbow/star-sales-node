const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
// 載入環境設定檔
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.post('/sendForm', function(req, res, next) {

  const data = req.body;

  //宣告發信物件
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'superrainbow9487@gmail.com',
        pass: 'j6h93cj/6'
    }
  });

  // 寄信內容
  const mailOptions ={
    //寄件者
    from: '"輔銷系統"<rainbow@test.com>',
    //收件者
    to: 'rainbow@mitake.com.tw',
    //主旨
    subject: '輔銷系統',
    //純文字
    text: '',
    //嵌入 html 的內文
    html: `<h2>輔銷系統信件通知：</h2>
    <p>需求者姓名：${data.name}</p>
    <p>email：${data.email} </p>
    <p>公司名稱： ${data.company}</p>
    <p>部門職稱： ${data.part}</p>
    <p>電話 ${data.tel}</p>
    <p>需求服務內容 ${data.requirement}</p>
    <p>預算 ${data.budget}</p>
    `
  }

  //發送信件
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.send({
          "message": "發送失敗！",
          "returnCode": 400
        });
    }else{
        console.log('訊息發送: ' + info.response);
        res.send({
          "message": "發送成功！",
          "returnCode": 200
        });
    }
  });

});

//Set Port
const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
