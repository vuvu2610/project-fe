import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./state";



const initialState: AuthState = {
  currentUser: null,
  cart: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = {
        ...action.payload.data,
        token: action.payload.token,
      };
    },

    registerSuccess: (state, action) => {},

    logOutSuccess: (state, action) => {
      state.currentUser = null;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    sendOTPSuccess: (state, action) => {},

    resetPasswordSuccess: (state, action) => {},
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logOutSuccess,
  updateUserSuccess,
  sendOTPSuccess,
  resetPasswordSuccess,
} = authSlice.actions;

export default authSlice.reducer;
