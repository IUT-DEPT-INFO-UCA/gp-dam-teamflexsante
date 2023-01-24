import { put, takeEvery } from 'redux-saga/effects'

import {
  register as apiRegister
} from '../../api/user'
import history from '../../../router/history'

import { SET_USER } from './slice'
import { USER_REGISTER } from './actions'
import { routes } from '../../../router/routes'
import { setToken } from '../../../utils/token'

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
  yield takeEvery(USER_REGISTER, register)
}