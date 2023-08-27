import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";
import { STORAGE_NAME } from "./localStorage";

const persistedTeam = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
      team: persistedTeam
    }
  }
});

export default store;
