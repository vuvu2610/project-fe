import { createSlice } from "@reduxjs/toolkit";
import { PersistState } from "./state";

const initialState: PersistState = {
  lang: "en",
};

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = persistSlice.actions;

export default persistSlice.reducer;
