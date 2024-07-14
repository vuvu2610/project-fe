import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUserInfoDto } from "../types/types";
interface AuthState {
  currentUser: GetUserInfoDto | null;
  cart: any;
}
const initialState: AuthState = {
  currentUser: null,
  cart: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<GetUserInfoDto>) => {
      state.currentUser = {
        ...action.payload
      };
    },

    registerSuccess: (state, action) => {},

    logOutSuccess: (state) => {
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
