import {
  createAction,
  // createAsyncThunk
} from "@reduxjs/toolkit";

const updateUserData = createAction("updateUserData");
const updateOnlyUserData = createAction("updateOnlyUserData");
const clearUserData = createAction("clearUserData");

// const getAndUpdateUserData = createAsyncThunk(
//   "userData/getAndUpdateUserData",
//   async (payload, thunkAPI) => {
//     const res = await getFanDetails();
//     return res?.user;
//   }
// );

export {
  updateOnlyUserData,
  updateUserData,
  clearUserData,
  // getAndUpdateUserData,
};
