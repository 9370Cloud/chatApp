const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../db"); // db 연결하기

// user 라우트에 해당하는 로직들을 여기에 작성 ex) 로그인, 회원가입 등 유저와 관련된 기능

router.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

// 로그인 POST 요청을 받는 함수
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.send("로그인했어용");
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
      connection.query(sql, [username], (err, results) => {
        if (err) return done(err);
        if (!results || results.length === 0)
          return done(null, false, { message: "없는 아이디에용" });

        const user = results[0];
        if (password === user.pw) {
          return done(null, user);
        } else {
          return done(null, false, { message: "비번틀렸어요" });
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

module.exports = router;
