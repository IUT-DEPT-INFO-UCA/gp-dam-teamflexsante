import { RESET_ERROR, RESET_VALIDATION, SET_ERROR, SET_VALIDATION } from './actions'

const initialState = {
  error: '',
  validation: ''
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload
      }
    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }
    case SET_VALIDATION:
      return {
        ...state,
        validation: payload
      }
    case RESET_VALIDATION:
      return {
        ...state,
        validation: ''
      }

    default:
      return state
  }
}

export default reducer
