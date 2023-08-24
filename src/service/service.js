import axios from "axios";

// Fetch all pokemons
export const fetchPokemons = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=1010`
    );
    // console.log('SERVICE : ', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
};

// Fetch a pokemon by url
// export const fetchPokemonByUrl = async (url) => {
//   try {
//     const response = await axios.get(url);
//     // console.log('SERVICE 2 : ', response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching pokemon:", error);
//     return [];
//   }
// };

// Fetch a pokemon by id
export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    // console.log('SERVICE : ', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return [];
  }
};
