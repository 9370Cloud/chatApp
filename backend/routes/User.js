const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../db"); // 데이터베이스 연결
const bcrypt = require('bcrypt'); // 비번 암호화
const jwt = require('jsonwebtoken'); // jwt

const router = express.Router();

const session = require('express-session');
router.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

const validUsernameCharacters = /^[a-zA-Z0-9]+$/; // 아이디에 입력 가능한 문자 : 숫자랑 영어 대소문자
const validPasswordCharacters = /^[a-zA-Z0-9!@^&]+$/; // 비번에 입력 가능한 문자 : 숫자 영어 대소문자, ! @ ^ &


// 회원가입 요청 처리 
router.post("/signup",(req,res)=>{
    console.log(req.body.username +', '+ req.body.password);
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: '공백 안 돼용 히히' });
    }
    if (!validUsernameCharacters.test(req.body.username) || !validPasswordCharacters.test(req.body.password)) {
      return res.status(400).json({ message: '그거 못써영' });
    }
    const sql = 'SELECT * FROM user WHERE id = ?;';
    connection.query(sql, [req.body.username], async (err, results) => {
      if (err) {
        console.error('Error checking username duplication:', err);
        return res.status(500).json({ message: 'Error checking username duplication' });
      }

      if (results.length !== 0) {
        res.send('아이디 중복이에영');
      } else {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const insertQuery = 'INSERT INTO user (id, pw) VALUES (?, ?);';
          connection.query(insertQuery, [req.body.username, hashedPassword], (err, results) => {
            if (err) {
              console.error('Error signing up:', err);
              return res.status(500).json({ message: 'Error signing up' });
            }
            res.send('성공했어염');
          });
        } catch (error) {
          console.error('Error hashing password:', error);
          res.status(500).json({ message: 'Error hashing password' });
        }
      }
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    (username, password, done) => {
      const sql = "SELECT * FROM user WHERE id = ?";
      connection.query(sql, [username], async (err, results) => {
        if (err) return done(err);
        if (!results || results.length === 0)
          return done(null, false, { message: "없는 아이디에용" });

        const user = results[0];
        try {
          const isMatch = await bcrypt.compare(password, user.pw);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        } catch (error) {
          console.error('Error comparing passwords:', error);
          return done(error);
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  const sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql, [아이디], (err, results) => {
    if (err) return done(err);
    if (!results || results.length === 0) return done(null, null);
    const user = results[0];
    done(null, user);
  });
});

// 로그인 요청 핸들러
router.post("/login", passport.authenticate("local"), function (req, res) {
  const token = jwt.sign({ id: req.body.id }, "비밀키", { expiresIn: "1h" }); // 비밀키는 본인이 설정한 값으로 대체해야 합니다.
  res.status(200).send({ token: token, expiresIn: 3600, message: "로그인했어용" });
  console.log(token)
});


// Passport.js와 같은 라이브러리에서는 내부적으로 Prepared Statement를 사용하여 SQL Injection을 방지하고 있습니다.
// 다만, SQL Injection에 대한 인식과 주의는 여전히 필요합니다.

// 로그인 여부를 확인하는 미들웨어. 요청.user : session을 통해 인증된 사용자의 정보를 담고있는 객체
function 로그인했니(요청, 응답, next) {
  if (요청.user) {
    next();
  } else {
    응답.send("로그인 안 하셨는데요?");
  }
}

router.use(로그인했니);

module.exports = router;
