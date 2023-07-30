const router = require("express").Router();
const connection = require("../db"); // db 연결하기

// user 라우트에 해당하는 로직들을 여기에 작성

// 빨간색 test 버튼 누르면 이거 실행됨
const TABLE_NAME = "user";
const USER_COLUMNS = ["id", "pw"];

router.get("/", (req, res) => {
  const sql = `SELECT ${USER_COLUMNS.join(", ")} FROM ${TABLE_NAME}`;
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

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true, // 요기는 세션을 만들건지
      passReqToCallback: false, // 요기는 아이디/비번말고 다른 정보검사가 필요한지
    },
    (입력한아이디, 입력한비번, done) => {
      const sql = "SELECT * FROM user WHERE id = ?";
      connection.query(sql, [입력한아이디], (에러, 결과) => {
        if (에러) return done(에러);

        if (!결과) return done(null, false, { message: "없는 아이디에용" });
        if (입력한비번 == 결과.pw) {
          return done(null, 결과);
        } else {
          return done(null, false, { message: "비번틀렸어요" });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id)
}); // 유저의 id를 바탕으로 세션아이디 만들고 유저한테 보내줌

passport.deserializeUser(function (아이디, done) {
  done(null, {})
}); 

router.post('/login', passport.authenticate('local'), function(요청, 응답){
  응답.send('로그인했어용')
});





module.exports = router;
