const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/Users");

// body-parser 사용
// application/x-www-form-urlencoded 형식,
// application/json 형식의 request를 분석 가능하도록 설정한다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면,
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userinfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
