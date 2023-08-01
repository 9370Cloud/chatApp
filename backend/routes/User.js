const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../db"); // 데이터베이스 연결
const bcrypt = require('bcrypt');

const router = express.Router();

// 라우터에 express-session 및 passport 미들웨어 추가
const session = require('express-session');
router.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

// 회원가입 시 비밀번호 암호화 및 데이터베이스 저장
router.post("/signup",(req,res)=>{
    console.log(req.body.username +', '+ req.body.password);
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

// 로그인 시 비밀번호 암호화 및 비교
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
  res.send("로그인했어용");
});

module.exports = router;
