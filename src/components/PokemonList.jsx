import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setPreviousPage,
  setNextPage,
} from "../service/globalPropsSlice";

import { useState, useEffect } from "react";
import { fetchPokemons } from "../service/service";
import Error from "../components/Error";

function PokemonList() {
  const { isLoading } = useSelector(
    (state) => state.globalProps
  );
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const limit = 10;
  const offset = 1;
  
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        dispatch(setLoading(true)); // Début du chargement
        const data = await fetchPokemons(limit, offset); // Fetch 10 pokemons
        setPokemons(data.results);
        dispatch(setPreviousPage(data.previous));
        dispatch(setNextPage(data.next));
        console.log('POKEMON LIST ',data.results);
        dispatch(setLoading(false)); // Fin du chargement
      } catch (error) {
        setError(error);
        dispatch(setLoading(false)); // Fin du chargement avec erreur
      }
    };
    fetchPokemonData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <Error err={error.message} />
  }

  return (
    <>
      {pokemons.map((pokemon, index) => (
        <div key={pokemon.name}>
          <a href={pokemon.url} target="_blank" rel="noreferrer">#{(index+1)+offset} - {pokemon.name}</a>
        </div>
      ))}
    </>
  );
}

export default PokemonList;
