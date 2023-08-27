import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_NAME } from "./localStorage";

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
    togglePokemonInTeam: (state, action) => {
      const { id, name } = action.payload;
      const existingIndex = state.team.findIndex(pokemon => pokemon.id === id);
      if (existingIndex !== -1) {
        state.team.splice(existingIndex, 1);
      } else {
        state.team.push({ id, name });
      }
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state.team));
    }, 
  },
});

export const { setSearch, togglePokemonInTeam } =
  globalPropsSlice.actions;

export default globalPropsSlice.reducer;
