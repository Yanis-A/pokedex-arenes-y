import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../service/utils";

// import PokeballSmall from "../assets/pokeball.png";

function Card({ id, name }) {
  // console.log(id, name)

  const { team } = useSelector(
    (state) => state.globalProps
  );

  const dispatch = useDispatch();

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const Name = name ? capitalizeFirstLetter(name) : "???";

  const handleToggleTeam = () => {
    dispatch(togglePokemonInTeam({id, name}));
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  return (
    <div className={"card shadow-sm " + (isPokemonInTeam ? "border border-2 border-warning" : "")} style={{ width: "10rem" }}>
      <img src={Image} className="card-img-top" alt={Name} />
      <div className="card-body text-center">
        <small>#{id}</small>
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
          <Link to={`/pokemon/${id}`} className="btn btn-outline-warning flex-grow-1">
            Details
          </Link>
          <button type="button" title={!isPokemonInTeam ? "Add to team" : "Remove from team"} onClick={handleToggleTeam} className="btn btn-outline-secondary ms-1 flex-grow-0">{!isPokemonInTeam ? "➕" : "✔️"}</button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Card;
