const express = require("express");
const router = express.Router();
const connection = require("../db"); // 이 코드로 데이터베이스에 연결함

router.get("/sample", (req, res) => {
  const sql = "SELECT id FROM user";
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

module.exports = router;
