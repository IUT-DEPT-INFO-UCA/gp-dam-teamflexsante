import { spawn } from 'redux-saga/effects'

import appSagas from './store/app/sagas'
import userSagas from './store/user/sagas'

export default function* rootSaga() {
  yield spawn(appSagas)
  yield spawn(userSagas)
}
