import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  team: []
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setTeam: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch, setTeam } =
  globalPropsSlice.actions;

export default globalPropsSlice.reducer;
