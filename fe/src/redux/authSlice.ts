import { createSlice } from "@reduxjs/toolkit";
import { GetUserInfoDto } from "../types/types";

interface AuthState {
  user: GetUserInfoDto | null;
  cart: any;
}

const initialState: AuthState = {
  user: null,
  cart: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        ...action.payload,
      };
    },

    registerSuccess: (state, action) => {},

    logOutSuccess: (state) => {
      state.user = null;
    },

    updateUserSuccess: (state, action) => {
      state.user = {
        ...state.user,
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
