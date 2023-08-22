import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPreviousPage: (state, action) => {
      state.previousPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
  },
});

export const { setLoading, setCurrentPage, setPreviousPage, setNextPage } =
  globalPropsSlice.actions;

export default globalPropsSlice.reducer;
