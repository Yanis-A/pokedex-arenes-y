import PropTypes from "prop-types";

// Displays a single item from the species object
function PokemonSpeciesItem({
  species,
  keyPath,
  isNumber,
  capitalize,
}) {
  function keyToTitle(key) {
    return capitalize(key.replace(/_/g, " "));
  }

  return (
    <>
      {species && species[keyPath] && (
        <div className="mx-3">
          <p className="fs-5 mb-1 fw-semibold">{keyToTitle(keyPath)}</p>
          <p className="fs-6 mb-1">
            {isNumber ? species[keyPath] : capitalize(species[keyPath].name)}
          </p>
        </div>
      )}
    </>
  );
}

PokemonSpeciesItem.propTypes = {
  species: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  keyPath: PropTypes.string.isRequired,
  isNumber: PropTypes.bool.isRequired,
  capitalize: PropTypes.func.isRequired,
};

export default PokemonSpeciesItem;
