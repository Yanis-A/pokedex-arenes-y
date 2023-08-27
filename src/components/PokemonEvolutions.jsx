import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Displays the evolution chain of a Pokémon
function PokemonEvolutions({ species, chain, name, capitalize }) {
  function isEvolutionName(name, evolutionName) {
    if (name === evolutionName) {
      return "text-black";
    } else {
      return "text-secondary";
    }
  }
  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center mb-3">
      {species && chain && <p className="fs-4 mb-1 fw-bold">Evolution chain</p>}
      {species && chain && chain?.chain?.evolves_to.length === 0 ? (
        <p className="fs-6 mb-1">
          This Pokémon doesn&apos;t have an evolution chain!
        </p>
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-center mb-1">
          {species && chain && chain?.chain?.species?.name && (
            <div className="mx-3">
              <p
                className={
                  "fs-6 mb-1 " +
                  isEvolutionName(
                    name,
                    capitalize(chain?.chain?.species?.name)
                  )
                }
              >
                {capitalize(chain?.chain?.species?.name)}
              </p>
            </div>
          )}
          {species && chain && chain?.chain?.species?.name && (
            <FontAwesomeIcon icon={faArrowRight} />
          )}
          {species && chain && (
            <>
              <div className="mx-3">
                <p
                  className={
                    "fs-6 mb-1 " +
                    isEvolutionName(
                      name,
                      capitalize(
                        chain?.chain?.evolves_to?.[0]?.species?.name
                      )
                    )
                  }
                >
                  {capitalize(
                    chain?.chain?.evolves_to?.[0]?.species?.name
                  )}
                </p>
              </div>
            </>
          )}
          {species &&
            chain &&
            chain?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name && (
              <FontAwesomeIcon icon={faArrowRight} />
            )}
          {species &&
            chain &&
            chain?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name && (
              <>
                <div className="mx-3">
                  <p
                    className={
                      "fs-6 mb-1 " +
                      isEvolutionName(
                        name,
                        capitalize(
                          chain?.chain?.evolves_to?.[0]?.evolves_to?.[0]
                            ?.species?.name
                        )
                      )
                    }
                  >
                    {capitalize(
                      chain?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species
                        ?.name
                    )}
                  </p>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

PokemonEvolutions.propTypes = {
  species: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  chain: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  capitalize: PropTypes.func.isRequired,
};

export default PokemonEvolutions;
