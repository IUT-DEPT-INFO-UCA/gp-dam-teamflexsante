import { put, takeEvery } from 'redux-saga/effects'

import { login as apiLogin, getUserByToken, postFeelingForm } from '../../api/user'
import history from '../../../router/history'

import { SET_USER } from './slice'
import { RELOAD_USER, SUBMIT_FEELING_FORM, USER_LOGIN } from './actions'
import { routes } from '../../../router/routes'
import { getToken, setToken } from '../../../utils/token'
import { SET_ERROR, SET_VALIDATION } from '../app/slice'

function* login(payload) {
  const res = yield apiLogin({
    email: payload.data.email,
    password: payload.data.password
  })

  if (res.statusCode === 201) {
    yield put({ type: SET_VALIDATION, payload: 'Connexion réussi !' })
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

function* submitFeelingForm(payload) {
  const token = getToken()

  if (token) {
    const res = yield postFeelingForm(payload.payload, token)
    if (res.statusCode === 201) {
      history.push(routes.account)
      yield put({ type: SET_VALIDATION, payload: 'Formulaire envoyé !' })
    } else {
      yield put({ type: SET_ERROR, payload: "Erreur lors de l'envoi du formulaire" })
    }
  }
}

export default function* userSagas() {
  yield takeEvery(USER_LOGIN, login)
  yield takeEvery(RELOAD_USER, authByToken)
  yield takeEvery(SUBMIT_FEELING_FORM, submitFeelingForm)
}
