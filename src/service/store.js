import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";

const persistedTeam = JSON.parse(localStorage.getItem("team")) || [];

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
