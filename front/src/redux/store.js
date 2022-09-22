import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import appReducer from './store/app/slice'
import userReducer from './store/user/slice'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middlewares)
})

sagaMiddleware.run(rootSaga)
