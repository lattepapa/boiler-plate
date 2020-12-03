import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted Email", Email);
    console.log("submitted Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    // 변화된 state를 action 객체에 반영시키기 위해 dispatch한다.
    // _action/user_action.js에서 이어서 처리
    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        width: `100%`,
        height: `100vh`,
      }}
    >
      <form
        style={{ display: `flex`, flexDirection: `column` }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
