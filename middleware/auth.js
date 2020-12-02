const { User } = require("../models/Users");

// 페이지마다 발생하는 인증들을 처리하는 곳
let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화한 후, 해당 결과와 일치하는 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;

    // 일치 유저가 없으면 인증 Deny
    if (!user) return res.json({ isAuth: false, error: true });

    // 일치 유저가 있으면 인증 OK
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
