import axios from "axios";

export const STORAGE_NAME = "reactdex-pokemon-storage";

export const fetchPokemons = async (count) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${count}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
};
