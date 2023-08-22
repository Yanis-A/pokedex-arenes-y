import axios from "axios";

export const fetchPokemons = async (count, offset) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${count}&offset=${offset}`
    );
    console.log('SERVICE : ', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
};
