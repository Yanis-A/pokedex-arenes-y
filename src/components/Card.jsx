import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../service/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

function Card({ id, name }) {
  const { team } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const Name = name ? capitalizeFirstLetter(name) : "???";

  const handleToggleTeam = (e) => {
    // Prevent the wrapping <Link> from navigating when toggling team.
    e.preventDefault();
    e.stopPropagation();
    dispatch(togglePokemonInTeam({ id, name }));
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  return (
    <Link
      to={`/pokemon/${id}`}
      aria-label={`View details of ${Name}`}
      className={
        "card h-100 shadow-sm position-relative d-flex flex-column align-items-center text-decoration-none text-body" +
        (isPokemonInTeam ? " border border-2 border-warning" : "")
      }
      style={{ width: "10rem" }}
    >
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
        className="btn btn-sm btn-light shadow-sm position-absolute top-0 end-0 m-2 rounded-circle d-inline-flex align-items-center justify-content-center"
        style={{ width: "2rem", height: "2rem", padding: 0, zIndex: 2 }}
      >
        <FontAwesomeIcon icon={isPokemonInTeam ? faMinus : faPlus} />
      </button>
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
      <div className="card-body text-center d-flex flex-column">
        <small>#{id}</small>
        <h5 className="card-title fw-bold mb-0">{Name}</h5>
      </div>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
