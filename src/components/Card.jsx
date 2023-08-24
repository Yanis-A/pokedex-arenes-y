import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { fetchPokemonByUrl } from "../service/service";
import { Link } from "react-router-dom";
import Error from "../components/Error";
// import styles from "../styles/typeColors.module.css";

import PokeballSmall from "../assets/pokeball.png";

function Card({ url }) {
  console.log(url)
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { team } = useSelector(
    (state) => state.globalProps
  );

  const dispatch = useDispatch();

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

  const Id = pokemon && pokemon.id;

  const handleToggleTeam = () => {
    dispatch(togglePokemonInTeam(url));
  };

  const isPokemonInTeam = team.includes(url);

  if (error) {
    return <Error err={error.message} />
  }

  return (
    (!loading && <div className="card" style={{ width: "10rem" }}>
      <img src={Image} className="card-img-top" alt={Name} />
      <div className="card-body text-center">
        <small>#{Id}</small>
        <h5 className="card-title fw-bold">{Name}</h5>
        {/* <p className="card-text">
          {pokemon && pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={"badge m-1 py-1 rounded-pill " + styles[type.type.name]}
                >
                  {type.type.name}
                </span>
              ))}
        </p> */}
        <div className="d-flex">
          <Link className="btn btn-outline-warning flex-grow-1">
            Details
          </Link>
          <button type="button" title={!isPokemonInTeam ? "Add to team" : "Remove from team"} onClick={handleToggleTeam} className="btn btn-outline-secondary ms-1 flex-grow-0">{!isPokemonInTeam ? "➕" : "✔️"}</button>
        </div>
      </div>
    </div>)
  );
}

Card.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Card;
