import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    validation: "",
    error: "",
  },
  reducers: {
    SET_VALIDATION: (state, action) => {
      state.validation = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = "";
    },
    CLEAR_VALIDATION: (state) => {
      state.validation = "";
    },
  },
});

export const { CLEAR_ERROR, CLEAR_VALIDATION, SET_VALIDATION, SET_ERROR } =
  appSlice.actions;

export default appSlice.reducer;
