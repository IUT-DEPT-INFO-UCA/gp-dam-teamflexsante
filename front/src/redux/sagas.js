import { spawn } from 'redux-saga/effects'

import appSagas from './store/app/sagas'

export default function* rootSaga() {
  yield spawn(appSagas)
}
