import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    validation: '',
    error: ''
  },
  reducers: {
    setValidation: (state, action) => {
      state.validation = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = ''
    },
    clearValidation: (state) => {
      state.validation = ''
    }
  }
})

export const { setValidation, setError, clearError, clearValidation } = appSlice.actions

export default appSlice.reducer
