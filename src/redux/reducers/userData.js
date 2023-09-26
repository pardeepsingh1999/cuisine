import { createSlice } from "@reduxjs/toolkit";
import { updateOnlyUserData, updateUserData, clearUserData } from "../actions";

const initialState = {
  user: null,
  _tokenResponse: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData, (state, action) => {
        state.user = action.payload?.user;
        state._tokenResponse = action.payload?._tokenResponse;
      })

      .addCase(updateOnlyUserData, (state, action) => {
        state.user = action.payload;
      })

      .addCase(clearUserData, (state, action) => {
        state.user = null;
        state._tokenResponse = null;
      });
  },
});

export const userDataReducer = userDataSlice.reducer;
