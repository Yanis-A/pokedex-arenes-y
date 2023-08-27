import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../service/utils";
import styles from "../styles/typeColors.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { STORAGE_NAME } from "../service/localStorage";

function Card({ id, name }) {
  const { team } = useSelector(
    (state) => state.globalProps
  );

  const dispatch = useDispatch();

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const Name = name ? capitalizeFirstLetter(name) : "???";

  //Sync local storage with redux store
  const handleToggleTeam = () => {
    dispatch(togglePokemonInTeam({ id, name }));
    const updatedTeam = team.some((pokemon) => pokemon.id === id)
      ? team.filter((pokemon) => pokemon.id !== id)
      : [...team, { id, name }];
    localStorage.setItem(STORAGE_NAME, JSON.stringify(updatedTeam));
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  return (
    <div className={"card shadow-sm position-relative d-flex flex-column align-items-center justify-content-center" + (isPokemonInTeam ? "border border-2 border-warning" : "")} style={{ width: "10rem" }}>
      <img src={Image} className="card-img-top" alt={Name} />
      {isPokemonInTeam && (  
        <div className="position-absolute top-0 end-0 d-flex align-itmens-center m-1">
          <span
                className={
                  "badge rounded-pill fw-normal " + styles.pokeball_red_bg
                }
                style={{ fontSize: "0.8rem"}}
              >
                In your team!
              </span>
        </div>
      )}
      <div className="card-body text-center">
        <small>#{id}</small>
        <h5 className="card-title fw-bold">{Name}</h5>
        <div className="d-flex">
          <Link to={`/pokemon/${id}`} className="btn btn-outline-warning flex-grow-1">
            Details
          </Link>
          <button type="button" title={!isPokemonInTeam ? "Add to team" : "Remove from team"} onClick={handleToggleTeam} className="btn btn-outline-light ms-1 flex-grow-0 text-dark">{!isPokemonInTeam ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faMinus} />}</button>
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
