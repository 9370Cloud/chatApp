const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());

// 서버 시작
app.listen(8080, function () {
  console.log('listening on 8080');
});

// 라우트 설정
app.use('/sample', require('./routes/Sample') ); // '/sample' 요청이 오면 './routes/Sample' 여기서 처리함 
app.use('/login', require('./routes/User'));

app.get("/sample2",(req,res)=>{
  res.send('123123')
})