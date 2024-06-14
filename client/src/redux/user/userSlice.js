import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    userDeleteStart: (state, action) => {
      state.loading = true;
    },
    userDeleteFaliure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    userDeleteSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
  },
});

export const {
  signInFaliure,
  signInStart,
  signInSuccess,
  userUpdateFaliure,
  userUpdateSuccess,
  userUpdateStart,
  userDeleteFaliure,
  userDeleteStart,
  userDeleteSuccess,
} = userSlice.actions;
export default userSlice.reducer;
