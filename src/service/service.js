import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async () => {
  const response = await axios.get(`${BASE_URL}/pokemon/?limit=1010`);
  return response.data;
};

export const fetchPokemonById = async (id) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};

export const fetchPokemonSpeciesById = async (id) => {
  const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
  return response.data;
};

export const fetchPokemonEvolutionChain = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
