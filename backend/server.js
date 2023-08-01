const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
const connection = require("./db"); // 이 코드로 데이터베이스에 연결함

// 서버 시작
app.listen(8080, function () {
  console.log('listening on 8080');
});

// 예제 코드 : 요청, 응답 + 데이터베이스 연결
app.get("/test",(req,res)=>{
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
})


// 라우터에 express-session 및 passport 미들웨어 추가

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), function (req, res) {
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