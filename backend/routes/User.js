const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require("../db"); // 데이터베이스 연결

const router = express.Router();

// 라우터에 express-session 및 passport 미들웨어 추가
const session = require('express-session');
router.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

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

// 로그인 요청 핸들러
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.send("로그인했어용");
});

router.post("/signup",(req,res)=>{
    console.log(req.body.username +', '+ req.body.password)
    const sql = 'SELECT * FROM user WHERE id = ?;';
    connection.query(sql,[req.body.username],function(err, results){
        if (results.length !== 0)
        {
          res.send('아이디 중복이에영')
        } else {
          const sql2 = 'INSERT INTO user VALUES (?,?);';
          connection.query(sql2, [req.body.username, req.body.password], (err, results)=>{
            res.send('성공했어염')
          })
        }
    })
})

module.exports = router;
