import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataTosubmit) {
  const req = axios
    .post("/api/users/login", dataTosubmit)
    .then((res) => res.data);

  // 이 req 내용을 이제 다시 reducer에 보내줘서 previous state와 current action을 조합하여 nextState를 만들어주도록 해야한다.
  return {
    type: LOGIN_USER,
    payload: req,
  };
}

export function registerUser(dataTosubmit) {
  const req = axios
    .post("/api/users/register", dataTosubmit)
    .then((res) => res.data);

  // 이 req 내용을 이제 다시 reducer에 보내줘서 previous state와 current action을 조합하여 nextState를 만들어주도록 해야한다.
  return {
    type: REGISTER_USER,
    payload: req,
  };
}
