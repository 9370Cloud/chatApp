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
    res.send(1)
  });

module.exports = router;