import axios from "axios";

// Fetch all pokemons
export const fetchPokemons = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=1010`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
};

// Fetch a pokemon by id
export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return [];
  }
};

// Fetch a pokemon species by id
export const fetchPokemonSpeciesById = async (id) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon species:", error);
    return [];
  }
};

// Fetch a pokemon evolution chain by url
export const fetchPokemonEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon species:", error);
    return [];
  }
};
