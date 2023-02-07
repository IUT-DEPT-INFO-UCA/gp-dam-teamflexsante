import { put, takeEvery } from "redux-saga/effects";

import { login as apiLogin } from "../../api/user";
import { register as apiRegister } from "../../api/user";
import history from "../../../router/history";

import { SET_USER } from "./slice";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "./actions";
import { routes } from "../../../router/routes";
import { setToken } from "../../../utils/token";
import { SET_ERROR, SET_VALIDATION } from "../app/slice";

function* login(payload) {
  const res = yield apiLogin({
    email: payload.data.email,
    password: payload.data.password,
  });

  if (res.statusCode === 201) {
    yield put({ type: SET_USER, payload: res.data });
    yield put({
      type: SET_VALIDATION,
      payload: "Utilisateur connecté avec succès",
    });
    setToken(res.data.token);
    history.push(routes.account);
  } else {
    yield put({ type: SET_ERROR, payload: res.message });
  }
}

function* logout() {
  setToken("");
  yield put({ type: SET_USER, payload: null });
  history.push(routes.login);
}

function* register(payload) {
  const res = yield apiRegister(payload.data);

  if (res.statusCode === 201) {
    yield put({ type: SET_USER, payload: res.data });
    yield put({
      type: SET_VALIDATION,
      payload: "Utilisateur créé avec succès",
    });
    setToken(res.data.token);
    history.push(routes.account);
  } else {
    yield put({ type: SET_ERROR, payload: res.message });
  }
}

export default function* userSagas() {
  yield takeEvery(USER_LOGIN, login);
  yield takeEvery(USER_REGISTER, register);
  yield takeEvery(USER_LOGOUT, logout);
}
