import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
});

export default store;
