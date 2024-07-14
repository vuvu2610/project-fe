import {
  combineReducers,
  legacy_createStore as createStore,
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import appReducer from "./appSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const appPersistConfig = {
  key: "app",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  app: persistReducer(appPersistConfig, appReducer),
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
