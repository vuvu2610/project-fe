import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./appSlice";
import authSlice from "./authSlice";
import persistSlice from "./persistSlice";

const persistConfig = {
  key: 'persist',
  storage,
}

const persistedReducer = persistReducer(persistConfig, persistSlice)

export const store = configureStore({
  reducer: { app: appSlice, auth: authSlice },
});

export const persistStorage = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(persistStorage);

export type RootState = ReturnType<typeof store.getState>;
export type PersistState = ReturnType<typeof persistStorage.getState>;
export type AppDispatch = typeof store.dispatch;
