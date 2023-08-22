import { useState, useEffect } from "react";
import { fetchPokemons } from "../service/service";
import Error from "../components/Error";

function PokemonList() {
  // Fetch pokemons
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true); // Début du chargement
        const data = await fetchPokemons(10); // Fetch 10 pokemons
        setPokemons(data);
        setLoading(false); // Fin du chargement
      } catch (error) {
        setError(error);
        setLoading(false); // Fin du chargement avec erreur
      }
    };
    fetchPokemonData();
  }, []);

  if (loading) {
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
      {pokemons.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </>
  );
}

export default PokemonList;
