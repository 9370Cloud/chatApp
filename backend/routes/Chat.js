const express = require('express');
const router = express.Router();

const 로그인했니 = require('./verifyToken');

// GET 요청을 처리하는 라우터에 verifyToken 미들웨어를 적용합니다.
router.get('/chat', 로그인했니, (req, res) => {
  // 검증된 토큰의 정보는 req.user에 담겨 있습니다.
  // 예를 들어, 토큰에 담긴 사용자 정보를 활용하여 특정 사용자의 데이터를 제공하거나
  // 인증된 사용자에게만 접근 가능한 데이터를 제공할 수 있습니다.
  
  // 검증이 완료되면, req.user 객체를 이용하여 특정 로직을 구현하면 됩니다.

  // 예제로 응답으로 "Chat 페이지에 오신 것을 환영합니다!" 메시지를 보내보겠습니다.
  res.json({ message: 'Chat 페이지에 오신 것을 환영합니다!' });
});

module.exports = router;