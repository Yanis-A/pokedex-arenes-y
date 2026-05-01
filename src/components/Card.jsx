import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../service/utils";
import styles from "../styles/typeColors.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

function Card({ id, name }) {
  const { team } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const Name = name ? capitalizeFirstLetter(name) : "???";

  const handleToggleTeam = () => {
    dispatch(togglePokemonInTeam({ id, name }));
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  return (
    <div
      className={
        "card h-100 shadow-sm position-relative d-flex flex-column align-items-center" +
        (isPokemonInTeam ? " border border-2 border-warning" : "")
      }
      style={{ width: "10rem" }}
    >
      <img
        src={Image}
        className="card-img-top"
        alt={Name}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK_IMAGE) {
            e.currentTarget.src = FALLBACK_IMAGE;
          }
        }}
      />
      {isPokemonInTeam && (
        <div className="position-absolute top-0 end-0 d-flex align-items-center m-1">
          <span
            className={"badge rounded-pill fw-normal " + styles.pokeball_red_bg}
            style={{ fontSize: "0.8rem" }}
          >
            In your team!
          </span>
        </div>
      )}
      <div className="card-body text-center d-flex flex-column">
        <small>#{id}</small>
        <h5 className="card-title fw-bold">{Name}</h5>
        <div className="d-flex mt-auto">
          <Link
            to={`/pokemon/${id}`}
            className="btn btn-outline-warning flex-grow-1"
          >
            Details
          </Link>
          <button
            type="button"
            title={isPokemonInTeam ? "Remove from team" : "Add to team"}
            aria-label={
              isPokemonInTeam
                ? `Remove ${Name} from team`
                : `Add ${Name} to team`
            }
            aria-pressed={isPokemonInTeam}
            onClick={handleToggleTeam}
            className="btn btn-outline-secondary ms-1 flex-grow-0"
          >
            <FontAwesomeIcon icon={isPokemonInTeam ? faMinus : faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
