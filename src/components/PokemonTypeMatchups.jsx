import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchType } from "../service/service";
import { capitalizeFirstLetter, getEmojiForType } from "../service/utils";
import styles from "../styles/typeColors.module.css";

const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

function computeMultipliers(typeData) {
  // typeData: array of /type/{name} responses, one per defending type
  const result = Object.fromEntries(ALL_TYPES.map((t) => [t, 1]));
  for (const data of typeData) {
    if (!data?.damage_relations) continue;
    const dr = data.damage_relations;
    for (const t of ALL_TYPES) {
      if (dr.no_damage_from?.some((x) => x.name === t)) result[t] *= 0;
      else if (dr.double_damage_from?.some((x) => x.name === t))
        result[t] *= 2;
      else if (dr.half_damage_from?.some((x) => x.name === t))
        result[t] *= 0.5;
    }
  }
  return result;
}

function TypeBadge({ name }) {
  return (
    <span
      className={
        "badge fw-normal fs-6 m-1 py-1 rounded-pill " + styles[name]
      }
    >
      {`${capitalizeFirstLetter(name)} ${getEmojiForType(name)}`}
    </span>
  );
}
TypeBadge.propTypes = { name: PropTypes.string.isRequired };

function PokemonTypeMatchups({ types }) {
  const [multipliers, setMultipliers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!types || types.length === 0) return;
    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          types.map((t) => fetchType(t.type.name))
        );
        if (!cancelled) setMultipliers(computeMultipliers(responses));
      } catch (err) {
        console.error("Error fetching type relations:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [types]);

  if (loading || !multipliers) return null;

  const buckets = {
    4: [],
    2: [],
    0.5: [],
    0.25: [],
    0: [],
  };
  for (const t of ALL_TYPES) {
    const m = multipliers[t];
    if (m in buckets) buckets[m].push(t);
  }

  const sections = [
    { mult: 4, label: "Weak to (4×)" },
    { mult: 2, label: "Weak to (2×)" },
    { mult: 0.5, label: "Resists (½×)" },
    { mult: 0.25, label: "Resists (¼×)" },
    { mult: 0, label: "Immune" },
  ];
  const visibleSections = sections.filter((s) => buckets[s.mult].length > 0);
  if (visibleSections.length === 0) return null;

  return (
    <div className="d-flex flex-column align-items-center mb-1">
      <p className="fs-4 mb-1 fw-bold">Type matchups</p>
      {visibleSections.map((s) => (
        <div
          key={s.mult}
          className="d-flex flex-column align-items-center mb-2"
          style={{ maxWidth: "320px" }}
        >
          <p className="fs-6 mb-1 fw-semibold">{s.label}</p>
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {buckets[s.mult].map((t) => (
              <TypeBadge key={t} name={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

PokemonTypeMatchups.propTypes = {
  types: PropTypes.array,
};

export default PokemonTypeMatchups;
