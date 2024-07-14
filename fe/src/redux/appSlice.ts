import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CardInfo} from '../types/types'

const initialState = {
  loading: false,
  cartCount: 0,
  listCartPay: [{price: 0, quantity: 0, id: 1, productId: 0}]
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
    addListCartPay: (state, action: PayloadAction<CardInfo[]> ) => {
      state.listCartPay = action.payload;
    },
  },
});

export const { fetchStart, fetchEnd, updateCartCount, addListCartPay} = appSlice.actions;

export default appSlice.reducer;
