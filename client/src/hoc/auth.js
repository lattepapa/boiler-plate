import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";

// 이 Higher Order Component는 App.js의 Routing에서 component={Auth(컴포넌트명, option, adminRoute)} 로 적용된다.
export default function (SpecificComponent, option, adminRoute = null) {
  // option: null => 아무나 출입 가능한 페이지
  // option: true => 로그인한 유저만 출입이 가능한 페이지
  // option: false => 로그인한 유저는 출입 불가능한 페이지
  // adminRoute: 기본값이 null이며, 만약 어드민 권한이 필요할 경우 true로 값 정하면 된다.
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);

        // 로그인하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태인데 어드민 유저권한은 없는 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            // 로그인한 상태인데 로그인 컴포넌트로 진입하려고 하는 등의 경우
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
