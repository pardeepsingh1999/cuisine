import { createSlice } from "@reduxjs/toolkit";
import { updateOnlyUserData, updateUserData, clearUserData } from "../actions";

const initialState = {
  token: null,
  user: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData, (state, action) => {
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })

      .addCase(updateOnlyUserData, (state, action) => {
        state.user = action.payload;
      })

      .addCase(clearUserData, (state, action) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const userDataReducer = userDataSlice.reducer;
