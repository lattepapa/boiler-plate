const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 회원가입 라우터에서 DB에 데이터를 저장하기 전에 미리 비밀번호를 암호화
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // 에러 시 바로 회원가입 라우터로 err을 던진다.
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 해쉬된 비밀번호로 스키마에 넣어서
        next(); // 회원가입 라우터로 던진다.
      });
    });
  } else {
    next();
  }
});

// 로그인 라우터에서 입력받은 비밀번호를 암호화하여 DB의 비밀번호와 비교
userSchema.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword도 암호화하여, DB에 입력된 암호화된 비밀번호와 비교해야 한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// 로그인 성공한 유저에게 JWT 생성
userSchema.methods.generateToken = function (callback) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

// 인증
userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // user id를 이용하여 유저를 찾은 후, 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는 지 확인한다.
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
