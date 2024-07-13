import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartCount: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchEnd: (state) => {
      state.loading = false;
    },
    updateCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { fetchStart, fetchEnd, updateCartCount} = appSlice.actions;

export default appSlice.reducer;
