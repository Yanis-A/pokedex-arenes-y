import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function idFromSpeciesUrl(url) {
  const match = url?.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

function formatTriggerName(name) {
  if (!name) return "Special";
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function prettify(name) {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Reduce an evolution_details entry to a short, human-readable label.
function formatCondition(detail) {
  if (!detail) return null;
  const parts = [];

  if (detail.min_level) parts.push(`Lv. ${detail.min_level}`);
  if (detail.item) parts.push(`Use ${prettify(detail.item.name)}`);
  if (detail.held_item) parts.push(`Hold ${prettify(detail.held_item.name)}`);
  if (detail.known_move) parts.push(`Knows ${prettify(detail.known_move.name)}`);
  if (detail.known_move_type)
    parts.push(`${prettify(detail.known_move_type.name)}-type move`);
  if (detail.location) parts.push(`At ${prettify(detail.location.name)}`);
  if (detail.min_happiness) parts.push("Friendship");
  if (detail.min_affection) parts.push("High affection");
  if (detail.min_beauty) parts.push("High beauty");
  if (detail.needs_overworld_rain) parts.push("Rain");
  if (detail.time_of_day) parts.push(`(${detail.time_of_day})`);
  if (detail.gender === 1) parts.push("(Female)");
  if (detail.gender === 2) parts.push("(Male)");
  if (detail.trade_species)
    parts.push(`Trade for ${prettify(detail.trade_species.name)}`);
  if (detail.party_species)
    parts.push(`With ${prettify(detail.party_species.name)} in party`);
  if (detail.party_type)
    parts.push(`With ${prettify(detail.party_type.name)}-type in party`);
  if (detail.relative_physical_stats === 1) parts.push("Atk > Def");
  if (detail.relative_physical_stats === -1) parts.push("Atk < Def");
  if (detail.relative_physical_stats === 0) parts.push("Atk = Def");
  if (detail.turn_upside_down) parts.push("Upside down");

  if (parts.length === 0) {
    if (detail.trigger?.name === "trade") return "Trade";
    return formatTriggerName(detail.trigger?.name);
  }
  return parts.join(" + ");
}

function ChainNode({ node, currentName, capitalize }) {
  const id = idFromSpeciesUrl(node?.species?.url);
  const name = node?.species?.name ? capitalize(node.species.name) : null;
  const isCurrent = name === currentName;

  if (!name) return null;

  const linkClass = isCurrent
    ? "fs-6 fw-bold text-body text-decoration-none evolution-link"
    : "fs-6 text-soft text-decoration-none evolution-link";

  const NameLink = id ? (
    <Link to={`/pokemon/${id}`} className={linkClass} title={name}>
      {name}
    </Link>
  ) : (
    <span className={linkClass}>{name}</span>
  );

  if (!node.evolves_to || node.evolves_to.length === 0) {
    return NameLink;
  }

  const branches = node.evolves_to;
  const isBranching = branches.length > 1;

  return (
    <div className="d-flex flex-row align-items-center">
      {NameLink}
      <div
        className={`d-flex align-items-${isBranching ? "start" : "center"} ms-2 ${
          isBranching ? "flex-column" : "flex-row"
        }`}
      >
        {branches.map((child) => {
          const condition = formatCondition(child.evolution_details?.[0]);
          return (
            <div
              key={child.species.name}
              className="d-flex flex-row align-items-center mb-1"
            >
              <span className="d-flex flex-column align-items-center mx-2 small text-soft">
                <FontAwesomeIcon icon={faArrowRight} />
                {condition && (
                  <span className="text-nowrap" style={{ fontSize: "0.75rem" }}>
                    {condition}
                  </span>
                )}
              </span>
              <ChainNode
                node={child}
                currentName={currentName}
                capitalize={capitalize}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

ChainNode.propTypes = {
  node: PropTypes.object.isRequired,
  currentName: PropTypes.string.isRequired,
  capitalize: PropTypes.func.isRequired,
};

function PokemonEvolutions({ species, chain, name, capitalize }) {
  if (!species || !chain?.chain) return null;

  const root = chain.chain;
  const hasEvolutions = root.evolves_to?.length > 0;

  return (
    <div className="d-flex flex-column align-items-center mb-3">
      <p className="fs-4 mb-2 fw-bold">Evolution chain</p>
      {!hasEvolutions ? (
        <p className="fs-6 mb-1">
          This Pokémon doesn&apos;t have an evolution chain!
        </p>
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-start mb-1 flex-wrap">
          <ChainNode node={root} currentName={name} capitalize={capitalize} />
        </div>
      )}
    </div>
  );
}

PokemonEvolutions.propTypes = {
  species: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  chain: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string.isRequired,
  capitalize: PropTypes.func.isRequired,
};

export default PokemonEvolutions;
