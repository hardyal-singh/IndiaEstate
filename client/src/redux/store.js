import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userSlice from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
