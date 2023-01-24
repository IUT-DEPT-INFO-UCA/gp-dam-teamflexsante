import { put, takeEvery } from 'redux-saga/effects'

import { login as apiLogin, getUserByToken } from '../../api/user'
import {
  register as apiRegister
} from '../../api/user'
import history from '../../../router/history'

import { SET_USER } from './slice'
import { RELOAD_USER, USER_LOGIN, USER_REGISTER } from './actions'
import { routes } from '../../../router/routes'
import { setToken } from '../../../utils/token'

function* login(payload) {
    const res = yield apiLogin({
      email: payload.data.email,
      password: payload.data.password
    })
  
    if (res.statusCode === 201) {
      yield put({ type: SET_USER, payload: res.data })
      setToken(res.data.token)
      history.push(routes.account)
    }
  }

  function* authByToken() {
    const token = getToken()
  
    if (token) {
      const res = yield getUserByToken(token)
      if (res.statusCode === 200) {
        console.log(res.data)
        yield put({ type: SET_USER, payload: res.data })
        setToken(res.data.token)
      }
    }
  }

function* register(payload) {
  console.log('register', payload)
  const res = yield apiRegister(payload.data)

  if (res.statusCode === 201) {
    yield put({ type: SET_USER, payload: res.data })
    setToken(res.data.token)
    history.push(routes.account)
  }
}

export default function* userSagas() {
    yield takeEvery(USER_LOGIN, login)
    yield takeEvery(RELOAD_USER, authByToken)
    yield takeEvery(USER_REGISTER, register)
}