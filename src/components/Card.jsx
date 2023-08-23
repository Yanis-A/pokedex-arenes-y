import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchPokemonByUrl } from "../service/service";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import styles from "../styles/typeColors.module.css";

import PokeballSmall from "../assets/pokeball.png";

function Card({ url }) {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonByUrl(url);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching pokemon: ", error);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [url]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const Image = pokemon ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` : PokeballSmall;

  const Name = pokemon && pokemon.name !== null ? capitalizeFirstLetter(pokemon.name) : "???";

  function test() {
    console.log('favori', Name);
  }

  if (error) {
    return <Error err={error.message} />
  }

  return (
    (!loading && <div className="card" style={{ width: "10rem" }}>
      <button type="button" onClick={test} className="btn position-absolute top-0 end-0 p-2 bg-secondary bg-opacity-50">➕</button>
      <img src={Image} className="card-img-top" alt={Name} />
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{Name}</h5>
        <p className="card-text">
          {pokemon && pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={"badge m-1 py-1 rounded-pill " + styles[type.type.name]}
                >
                  {type.type.name}
                </span>
              ))}
        </p>
        <div className="d-flex">
          <Link className="btn btn-outline-warning flex-grow-1">
            Details
          </Link>
          <button type="button" onClick={test} className="btn btn-outline-secondary ms-1 flex-grow-0">➕</button>
        </div>
      </div>
    </div>)
  );
}

Card.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Card;
