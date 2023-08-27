import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Returns navigation buttons to the previous and next pokemon
function PokemonNavigation({ id, min, max }) {
  return (
    <>
      {id > min && (
        <Link
          to={`/pokemon/${id - 1}`}
          className="position-fixed top-50 start-0 translate-middle-y m-3"
          style={{ zIndex: 1000 }}
        >
          <button className="btn btn-outline-dark" title="Previous Pokémon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
      )}
      {id < max && (
        <Link
          to={`/pokemon/${id + 1}`}
          className="position-fixed top-50 end-0 translate-middle-y m-3"
          style={{ zIndex: 1000 }}
        >
          <button className="btn btn-outline-dark" title="Next Pokémon">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </Link>
      )}
    </>
  );
}

PokemonNavigation.propTypes = {
  id: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default PokemonNavigation;
