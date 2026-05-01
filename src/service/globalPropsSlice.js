import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_NAME } from "./localStorage";

const initialState = {
  search: "",
  team: [],
  lastTeamAction: null,
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
      const existingIndex = state.team.findIndex(
        (pokemon) => pokemon.id === id
      );
      if (existingIndex !== -1) {
        state.team.splice(existingIndex, 1);
        state.lastTeamAction = {
          type: "remove",
          id,
          name,
          ts: Date.now(),
        };
      } else {
        state.team.push({ id, name });
        state.lastTeamAction = {
          type: "add",
          id,
          name,
          ts: Date.now(),
        };
      }
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state.team));
    },
  },
});

export const { setSearch, togglePokemonInTeam } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
