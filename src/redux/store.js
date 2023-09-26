import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import { loaderDataReducer, userDataReducer } from "./reducers";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  loaderData: loaderDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  keyPrefix: "",
  stateReconciler: hardSet,
  blacklist: ["loaderData"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

const devTools = process.env.REACT_APP_BACKEND_ENV === "live" ? false : true;

export const store = configureStore({
  reducer: pReducer,
  devTools,
  middleware: (getDefaultMiddleware) =>
    devTools
      ? getDefaultMiddleware({ serializableCheck: false }).concat([logger])
      : getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
