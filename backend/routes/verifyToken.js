const jwt = require('jsonwebtoken');
const secretKey = '비밀키'; // JWT를 생성할 때 사용한 비밀키

const 로그인했니 = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: '토큰이 없습니다.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    req.user = decoded; // 검증된 토큰의 정보를 요청 객체에 추가하여 다른 라우터에서 활용할 수 있도록 합니다.
    next();
  } catch (err) {
    return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = 로그인했니;