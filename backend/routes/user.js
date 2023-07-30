const router = require('express').Router();
const connection = require('../db'); // db.js 파일로부터 커넥션 프로세스 임포트

// user 라우트에 해당하는 로직들을 여기에 작성
const TABLE_NAME = "user";
const USER_COLUMNS = ["id", "pw"];

router.get('/', (req, res) => {
  const sql = `SELECT ${USER_COLUMNS.join(', ')} FROM ${TABLE_NAME}`;
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

// 다른 라우트들을 추가할 수 있음

module.exports = router;
