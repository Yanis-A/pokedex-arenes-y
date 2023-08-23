import { useState, useEffect } from "react";
import { fetchPokemons } from "../service/service";
import Error from "../components/Error";
import Card from "../components/Card";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPokemonsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemons();
        setPokemons(data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching pokemons: ", error);
        setLoading(false);
      }
    };
    fetchPokemonsData();
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
    <div className="container-fluid">
      <div className="row">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="col m-1 p-0 d-flex flex-wrap justify-content-center">
            <Card url={pokemon.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
