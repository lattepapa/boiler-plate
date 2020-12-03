import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
      } else {
        alert("Sign out is fail");
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
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>Sign Out</button>
    </div>
  );
}

export default withRouter(LandingPage);
