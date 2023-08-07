const express = require('express');
const router = express.Router();
const connection = require("../db");
const 로그인했니 = require('./verifyToken');

router.get('/list', 로그인했니, (req, res) => {
  res.json({ message: 'ChatList 페이지에 오신 것을 환영합니다!' });
});

router.get('/createchatroom', 로그인했니, (req, res) => {
    res.json({ message: '채팅방만들러오셨군' });
  });

router.post('/createchatroom', (req, res) => {
  const sql1 = 'INSERT INTO chat_room VALUES(NULL, ?, ?, NOW())';
  const sql1_1 = 'SELECT room_id WHERE WHERE room_name = ? AND creator_id = ? LIMIT 1 DESC ';
  const sql2 = 'INSERT INTO chat_room_member VALUES(?, ?, NOW())';
  const sql3 = 'INSERT INTO chat_room_member VALUES(?, ?, NOW())';
  let room_id = "";

  // 첫 번째 쿼리 실행
  connection.query(sql1, [req.body.room_name, req.body.username], (err, result) => {
      if (err) {
          console.error(err);
          return;
      }

      // 쿼리 결과로부터 room_id를 가져옴
      room_id = result.insertId;

      // 두 번째 쿼리 실행
      connection.query(sql2, [room_id, req.body.username], (err) => {
          if (err) {
              console.error(err);
              return;
          }

          // 세 번째 쿼리 실행
          connection.query(sql3, [room_id, req.body.user_id], (err) => {
              if (err) {
                  console.error(err);
                  return;
              }

              // 순차적으로 실행된 모든 쿼리가 끝나면 이곳에서 다음 작업을 수행할 수 있습니다.
              console.log("모든 쿼리가 순차적으로 실행되었습니다.");
              res.send("채팅방 만들기 성공했도르")
          });
      });
  });
});



module.exports = router;