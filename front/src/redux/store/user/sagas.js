import { put, takeEvery } from 'redux-saga/effects'

import {
  acceptRequest,
  generateFakeData as apiGenerateFakeData,
  login as apiLogin,
  register as apiRegister,
  getUserById,
  getUserByToken,
  postFeelingForm,
  sendRequest
} from '../../api/user'
import history from '../../../router/history'

import { SET_GROUP, SET_USER } from './slice'
import {
  ACCEPT_REQUEST_ADD_MEMBER,
  GENERATE_FAKE_DATA,
  GET_GROUP_INFO,
  RELOAD_USER,
  SEND_NOTIFICATION_ADD_MEMBER,
  SUBMIT_FEELING_FORM,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER
} from './actions'
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

function* register(payload) {
  console.log('register', payload)
  const res = yield apiRegister(payload.data)

  if (res.statusCode === 201) {
    yield put({ type: SET_USER, payload: res.data })
    setToken(res.data.token)
    history.push(routes.account)
  }
}

function* logout() {
  setToken('')
  yield put({ type: SET_USER, payload: null })
  history.push(routes.login)
}

function* authByToken() {
  const token = getToken()

  if (token) {
    const res = yield getUserByToken(token)
    if (res.statusCode === 200) {
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

function* sendNotificationAddMember(payload) {
  const token = getToken()

  if (token) {
    const res = yield sendRequest(
      {
        email: payload.payload.email
      },
      token
    )
    if (res.statusCode === 201) {
      yield put({ type: SET_VALIDATION, payload: 'Demande envoyée' })
    } else {
      yield put({ type: SET_ERROR, payload: "Erreur lors de l'envoi de la demande" })
    }
  }
}

function* acceptRequestAddMember(payload) {
  const token = getToken()

  if (token) {
    const res = yield acceptRequest(
      {
        email: payload.payload.email,
        notificationId: payload.payload.notificationId
      },
      token
    )
    if (res.statusCode === 201) {
      yield put({ type: SET_VALIDATION, payload: 'Demande acceptée' })
    } else {
      yield put({ type: SET_ERROR, payload: 'Erreur' })
    }
  }
}

function* getGroupInfo(payload) {
  const group = []
  for (let i = 0; i < payload.payload.length; i++) {
    const res = yield getUserById(payload.payload[i])
    if (res.statusCode === 200) {
      group.push(res.data)
    }
  }
  yield put({ type: SET_GROUP, payload: group })
}

function* generateFakeData() {
  const res = yield apiGenerateFakeData()
  if (res.statusCode === 200) {
    yield put({ type: SET_VALIDATION, payload: 'Données générées' })
  } else {
    yield put({ type: SET_ERROR, payload: 'Erreur' })
  }
}

export default function* userSagas() {
  yield takeEvery(USER_LOGIN, login)
  yield takeEvery(USER_REGISTER, register)
  yield takeEvery(USER_LOGOUT, logout)
  yield takeEvery(RELOAD_USER, authByToken)
  yield takeEvery(SUBMIT_FEELING_FORM, submitFeelingForm)
  yield takeEvery(SEND_NOTIFICATION_ADD_MEMBER, sendNotificationAddMember)
  yield takeEvery(ACCEPT_REQUEST_ADD_MEMBER, acceptRequestAddMember)
  yield takeEvery(GET_GROUP_INFO, getGroupInfo)
  yield takeEvery(GENERATE_FAKE_DATA, generateFakeData)
}
