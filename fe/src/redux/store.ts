import {
  combineReducers,
  legacy_createStore as createStore,
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import appReducer from "./appSlice";


const authConfig = {
  key: "auth",
  storage: storage,
};

const appConfig = {
  key: "app",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  app: persistReducer(appConfig, appReducer)
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { persistor, store };