import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPokemons } from "../service/service";
import Error from "../components/Error";
import Card from "../components/Card";
import PropTypes from "prop-types";

function PokemonList({ teamArray }) {
  const { search } = useSelector((state) => state.globalProps);

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonsData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (teamArray) {
          setPokemons(teamArray);
          setLoading(false);
        } else {
          const data = await fetchPokemons();
          setPokemons(data.results);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching pokemons: ", error);
        setLoading(false);
      }
    };
    fetchPokemonsData();
  }, [teamArray]);

  function getIdFromUrl(url) {
    const urlParts = url.split("/");
    const idStr = urlParts.slice(-2, -1)[0];
    return +idStr;
  }

  let arrayToReturn = [];

  if (search === "") {
    arrayToReturn = pokemons;
  } else {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.startsWith(search)
    );
    arrayToReturn =
      filteredPokemons.length > 0
        ? filteredPokemons
        : [{ name: "No Pokémon found!" }];
  }

  if (loading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <Error err={error.message} />;
  }

  if (arrayToReturn.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center my-3">
        <img
          src="https://thumbs.gfycat.com/EachWellinformedAidi-size_restricted.gif"
          alt="Empty PokeBall"
          className="rounded"
        />
        <p className="fs-3">No Pokémon found!</p>
      </div>
    );
  }

  return (
    <div className="container-fluid m-auto">
      <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
        {arrayToReturn.map((pokemon) => {
          if (pokemon.name === "No Pokémon found!") {
            return (
              <div
                key="no-pokemon-found"
                className="d-flex flex-column align-items-center my-3"
              >
                <img
                  src="https://thumbs.gfycat.com/EachWellinformedAidi-size_restricted.gif"
                  alt="Empty PokeBall"
                  className="rounded"
                />
                <p className="fs-3">{pokemon.name}</p>
              </div>
            );
          }
          const id = teamArray ? pokemon.id : getIdFromUrl(pokemon.url);
          const name = pokemon.name;
          return (
            <div key={id} className="m-1">
              <Card id={id} name={name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

PokemonList.propTypes = {
  teamArray: PropTypes.array,
};

export default PokemonList;
