import {
  combineReducers,
  legacy_createStore as createStore,
} from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

export { persistor, store };
