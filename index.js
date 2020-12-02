const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/Users");

// body-parser 사용
// application/x-www-form-urlencoded 형식,
// application/json 형식의 request를 분석 가능하도록 설정한다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cookie-parser 사용
// JWT를 쿠키에 저장 가능하도록 설정한다.
app.use(cookieParser());

// MongoDB 연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB is connected..`))
  .catch((err) => console.log(err));

// Routing
// 기본 라우팅
app.get("/", (req, res) => res.send("Hello World!"));

// 회원가입 라우팅
app.post("/api/users/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client가 보낸 req에서 가져오면,
  const user = new User(req.body);

  // (userSchema에서 bcrypt로 비밀번호 사전 암호화 후)데이터베이스에 넣어준다.
  user.save((err, userinfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// 로그인 라우팅
app.post("/api/users/login", (req, res) => {
  // 로그인 요청된 이메일이 DB에 있는 지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "일치하는 계정이 없습니다.",
      });
    }

    // 로그인 요청된 이메일이 DB에 있다면, 비밀번호가 맞는 지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키에
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 인증 라우팅
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해왔다는 것은, authentication이 true라는 의미이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
