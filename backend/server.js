const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
const connection = require("./db"); // 데이터베이스 연결

// 서버 시작
app.listen(8080, function () {
  console.log('listening on 8080');
});

// 예제 코드 : 요청, 응답 + 데이터베이스 연결
app.get("/test",(req,res)=>{
  const sql = "SELECT id, pw FROM user";
  connection.query(sql, function (err, rows) {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Query result:", rows);
      res.send(rows);
    }
  });
});

// User.js에서 라우터 가져오기
const userRouter = require('./routes/User');
app.use(userRouter);
