import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    validation: '',
    error: ''
  },
  reducers: {
    CLEAR_ERROR: (state) => {
      state.error = ''
    },
    CLEAR_VALIDATION: (state) => {
      state.validation = ''
    }
  }
})

export const { CLEAR_ERROR, CLEAR_VALIDATION } = appSlice.actions

export default appSlice.reducer