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
    togglePokemonInTeam: (state, action) => {
      const url = action.payload;
      if (state.team.includes(url)) {
        state.team = state.team.filter(pokemonUrl => pokemonUrl !== url);
      } else {
        state.team.push(url);
      }
    },
  },
});

export const { setSearch, togglePokemonInTeam } =
  globalPropsSlice.actions;

export default globalPropsSlice.reducer;
