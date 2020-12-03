import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_action/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted Email", Email);
    console.log("submitted Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호를 정확하게 입력하세요.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // 변화된 state를 action 객체에 반영시키기 위해 dispatch한다.
    // _action/user_action.js에서 이어서 처리
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default RegisterPage;
