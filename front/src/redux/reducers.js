import { combineReducers } from 'redux'

import appReducer from './store/app/redux'

const createRootReducer = combineReducers({
  app: appReducer
})

export default createRootReducer
