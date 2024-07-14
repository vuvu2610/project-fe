import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartNumber: 0
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
    updateCartNumber: (state, action: PayloadAction<number>) => {
      state.cartNumber = action.payload;
    }
  },
});

export const { fetchStart, fetchEnd, updateCartNumber} = appSlice.actions;

export default appSlice.reducer;
