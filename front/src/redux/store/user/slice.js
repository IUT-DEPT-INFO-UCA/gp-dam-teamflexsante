import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    group: null
  },
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload
    },
    SET_GROUP: (state, action) => {
      state.group = action.payload
    }
  }
})

export const { SET_USER, SET_GROUP } = userSlice.actions

export default userSlice.reducer
