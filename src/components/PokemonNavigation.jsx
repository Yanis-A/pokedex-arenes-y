import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function PokemonNavigation({ id, min, max }) {
  const hasPrev = id > min;
  const hasNext = id < max;

  return (
    <>
      {/* Inline navigation, mobile / tablet only */}
      <div className="d-flex d-lg-none justify-content-between align-items-center w-100 px-3 pt-3">
        {hasPrev ? (
          <Link
            to={`/pokemon/${id - 1}`}
            title="Previous Pokémon"
            className="btn btn-outline-dark"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> #{id - 1}
          </Link>
        ) : (
          <span />
        )}
        {hasNext ? (
          <Link
            to={`/pokemon/${id + 1}`}
            title="Next Pokémon"
            className="btn btn-outline-dark"
          >
            #{id + 1} <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Floating arrows, desktop only */}
      {hasPrev && (
        <Link
          to={`/pokemon/${id - 1}`}
          title="Previous Pokémon"
          className="btn btn-outline-dark position-fixed top-50 start-0 translate-middle-y m-3 d-none d-lg-inline-flex"
          style={{ zIndex: 1000 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      {hasNext && (
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
