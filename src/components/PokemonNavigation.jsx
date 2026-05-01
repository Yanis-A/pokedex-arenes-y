import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function PokemonNavigation({ id, min, max }) {
  return (
    <>
      {id > min && (
        <Link
          to={`/pokemon/${id - 1}`}
          title="Previous Pokémon"
          className="btn btn-outline-dark position-fixed top-50 start-0 translate-middle-y m-3 d-none d-lg-inline-flex"
          style={{ zIndex: 1000 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      {id < max && (
        <Link
          to={`/pokemon/${id + 1}`}
          title="Next Pokémon"
          className="btn btn-outline-dark position-fixed top-50 end-0 translate-middle-y m-3 d-none d-lg-inline-flex"
          style={{ zIndex: 1000 }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
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
