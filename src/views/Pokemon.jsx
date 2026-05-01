// Modules
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Error from "../components/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import StatBar from "../components/StatBar";

// Functions
import {
  fetchPokemonById,
  fetchPokemonSpeciesById,
  fetchPokemonEvolutionChain,
} from "../service/service";
import {
  capitalizeFirstLetter,
  getEmojiForType,
  getEnglishFlavorText,
} from "../service/utils";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { getColorForType } from "../service/utils";
import { MIN_POKEMON_ID, MAX_POKEMON_ID } from "../service/constants";

// Styling
import styles from "../styles/typeColors.module.css";
import stylesPokemon from "../styles/Pokemon.module.css";

import PokemonNavigation from "../components/PokemonNavigation";
import PokemonEvolutions from "../components/PokemonEvolutions";
import PokemonSpeciesItem from "../components/PokemonSpeciesItem";
import PokemonTypeMatchups from "../components/PokemonTypeMatchups";

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

function Pokemon() {
  const { team } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id: rawId } = useParams();
  const id = Number(rawId);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPokemonById(id);
        setPokemon(data);

        const data_species = await fetchPokemonSpeciesById(id);
        setPokemonSpecies(data_species);

        if (data_species?.evolution_chain?.url) {
          const data_evolution = await fetchPokemonEvolutionChain(
            data_species.evolution_chain.url
          );
          setEvolutionChain(data_evolution);
        }
      } catch (err) {
        setError(err);
        console.error(`Error fetching pokemon #${id} info:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (Number.isNaN(id)) {
      navigate("/notfound");
    } else if (id < MIN_POKEMON_ID || id > MAX_POKEMON_ID) {
      navigate("/nopokemon");
    } else {
      fetchPokemonData();
    }
  }, [id, navigate]);

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const Name = pokemon?.name ? capitalizeFirstLetter(pokemon.name) : "???";
  const Types = pokemon && pokemon.types;
  const FirstType = Types && Types[0].type.name;
  const LastType = Types && Types[Types.length - 1].type.name;
  const Height = pokemon && (pokemon.height / 10).toFixed(1) + "m";
  const Weight = pokemon && (pokemon.weight / 10).toFixed(1) + "kg";
  const Abilities = pokemon && pokemon.abilities;
  const BaseStats = pokemon && pokemon.stats;
  const BaseStatsMap =
    BaseStats &&
    BaseStats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));
  const FlavorTexts = pokemonSpecies && pokemonSpecies.flavor_text_entries;
  const speciesSpecsArray = [
    {
      keyPath: "habitat",
      isNumber: false,
    },
    {
      keyPath: "generation",
      isNumber: false,
    },
    {
      keyPath: "color",
      isNumber: false,
    },
    {
      keyPath: "shape",
      isNumber: false,
    },
    {
      keyPath: "growth_rate",
      isNumber: false,
    },
    {
      keyPath: "hatch_counter",
      isNumber: true,
    },
    {
      keyPath: "capture_rate",
      isNumber: true,
    },
  ];

  const handleToggleTeam = () => {
    if (pokemon?.name) {
      dispatch(togglePokemonInTeam({ id, name: pokemon.name }));
    }
  };

  const isPokemonInTeam = team.some((p) => p.id === id);

  if (loading) {
    return (
      <div
        className="container-fluid d-flex flex-column flex-lg-row flex-grow-1 placeholder-glow"
        aria-busy="true"
        aria-label="Loading Pokémon"
      >
        <div className="py-3 d-flex flex-grow-1 flex-column align-items-center justify-content-center">
          <span className="placeholder col-3 mb-2"></span>
          <span className="placeholder col-6 mb-3" style={{ height: "2rem" }}></span>
          <div
            className="placeholder rounded my-3"
            style={{ width: "min(280px, 80%)", height: "280px" }}
          ></div>
          <span className="placeholder col-4 mt-2"></span>
        </div>
        <div className="py-3 d-flex flex-grow-1 flex-column align-items-center px-3">
          <span className="placeholder col-4 mb-3" style={{ height: "1.5rem" }}></span>
          <span className="placeholder col-8 mb-2"></span>
          <span className="placeholder col-7 mb-2"></span>
          <span className="placeholder col-9 mb-2"></span>
          <span className="placeholder col-6 mb-2"></span>
          <span className="placeholder col-8 mb-2"></span>
          <span className="placeholder col-5 mb-2"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error err={error.message} />;
  }

  return (
    <div
      className="container-fluid d-flex flex-column flex-lg-row position-relative flex-grow-1"
      style={{
        backgroundColor: getColorForType(Types ? LastType : "", 0.1),
      }}
    >
      {/* Navigation through available pokemons */}
      <PokemonNavigation id={id} min={MIN_POKEMON_ID} max={MAX_POKEMON_ID} />
      <div
        className={
          "py-3 py-lg-0 d-flex flex-grow-1 flex-column align-items-center justify-content-center text-center " +
          stylesPokemon.responsive_w_50
        }
      >
        <h2 className="fw-lighter">#{id}</h2>
        <h1 className="fw-bold">{Name}</h1>
        <div style={{ maxWidth: "300px" }} className="position-relative my-3">
          {isPokemonInTeam && (
            <div className="position-absolute top-0 end-0 m-1">
              <span
                className={
                  "badge m-1 py-2 rounded-pill " + styles.pokeball_red_bg
                }
              >
                In your team!
              </span>
            </div>
          )}
          <img
            src={Image}
            alt={Name}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMAGE) {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }}
            className={`rounded img-fluid ${styles[`${FirstType}_medium`]} ${
              styles[`shadow-${FirstType}`]
            }`}
          />
        </div>
        {FlavorTexts && (
          <p className="fs-6 fst-italic mb-2 w-75">
            {getEnglishFlavorText(FlavorTexts)}
          </p>
        )}
        <button
          type="button"
          title={!isPokemonInTeam ? "Add" : "Remove"}
          onClick={handleToggleTeam}
          className={"btn ms-1 flex-grow-0 btn-outline-dark"}
        >
          {isPokemonInTeam ? (
            <>
              Remove from the team <FontAwesomeIcon icon={faMinus} />
            </>
          ) : (
            <>
              Add to the team <FontAwesomeIcon icon={faPlus} />
            </>
          )}
        </button>
      </div>
      <div
        className={
          "d-flex flex-grow-1 flex-column align-items-center text-center " +
          stylesPokemon.max_height_lg +
          " " +
          stylesPokemon.responsive_w_50
        }
      >
        <p className="fs-4 mb-1 mt-3 fw-bold">Main specs</p>
        <p className="fs-5 mb-1 fw-semibold">
          {Types && Types.length > 1 ? "Types" : "Type"}
        </p>
        <div className="d-flex flex-row align-items-center justify-content-center mb-1">
          {Types &&
            Types.map((type) => (
              <span
                key={type.type.name}
                className={
                  "badge fw-normal fs-6 m-1 py-1 rounded-pill " +
                  styles[type.type.name]
                }
              >
                {`${capitalizeFirstLetter(type.type.name)} ${getEmojiForType(
                  type.type.name
                )}`}
              </span>
            ))}
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center mb-1">
          <div className="mx-3">
            <p className="fs-5 mb-1 fw-semibold">Height</p>
            <p className="fs-6 mb-1">{Height}</p>
          </div>
          <div className="mx-3">
            <p className="fs-5 mb-1 fw-semibold">Weight</p>
            <p className="fs-6 mb-1">{Weight}</p>
          </div>
        </div>
        <p className="fs-5 mb-1 fw-semibold">
          {Abilities && Abilities.length > 1 ? "Abilities" : "Ability"}
        </p>
        <div className="d-flex flex-row align-items-center justify-content-center mb-1">
          {Abilities &&
            Abilities.map((ability, index) => (
              <span
                key={index}
                className={
                  "badge fw-normal fs-6 m-1 py-1 rounded-pill text-black " +
                  styles[`${FirstType}_light`]
                }
              >
                {capitalizeFirstLetter(ability.ability.name)}
              </span>
            ))}
        </div>
        {pokemon && pokemon.base_experience && (
          <div className="mb-1">
            <p className="fs-5 mb-1 fw-semibold">Base experience</p>
            <p className="fs-6 mb-1">{pokemon && pokemon.base_experience}</p>
          </div>
        )}
        <hr
          style={{ width: "300px" }}
          className="border border-secondary border-1 opacity-50 m-1"
        />
        {BaseStats && <p className="fs-4 mb-1 fw-bold">Base stats</p>}
        {BaseStatsMap &&
          BaseStatsMap.map((stat) => (
            <StatBar
              key={stat.name}
              name={stat.name}
              value={stat.value}
              type={FirstType}
            />
          ))}
        {pokemon?.stats && (
          <div className="d-flex flex-row flex-wrap justify-content-center align-items-center mb-1">
            <div className="mx-3">
              <p className="fs-5 mb-1 fw-semibold">Total</p>
              <p className="fs-6 mb-1">
                {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
              </p>
            </div>
          </div>
        )}
        <hr
          style={{ width: "300px" }}
          className="border border-secondary border-1 opacity-50 m-1"
        />
        <div
          className="d-flex flex-column justify-content-center align-items-center mb-1"
          style={{ maxWidth: "300px" }}
        >
          <p className="fs-4 mb-1 fw-bold">Species specs</p>
          <div className="d-flex flex-row flex-wrap justify-content-center align-items-center mb-1">
            {speciesSpecsArray.map((spec) => (
              <PokemonSpeciesItem
                key={spec.keyPath}
                species={pokemonSpecies}
                keyPath={spec.keyPath}
                isNumber={spec.isNumber}
                capitalize={capitalizeFirstLetter}
              />
            ))}
            {pokemonSpecies && pokemonSpecies.egg_groups && (
              <div className="mx-3">
                <p className="fs-5 mb-1 fw-semibold">Egg groups</p>
                <div className="fs-6 mb-1">
                  {pokemonSpecies.egg_groups.map((egg_group) => (
                    <span
                      key={egg_group.name}
                      className={
                        "badge fw-normal fs-6 m-1 py-1 rounded-pill text-black " +
                        styles[`${FirstType}_light`]
                      }
                    >
                      {capitalizeFirstLetter(egg_group.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr
          style={{ width: "300px" }}
          className="border border-secondary border-1 opacity-50 m-1"
        />
        <PokemonTypeMatchups types={Types} />
        <hr
          style={{ width: "300px" }}
          className="border border-secondary border-1 opacity-50 m-1"
        />
        <PokemonEvolutions
          species={pokemonSpecies}
          chain={evolutionChain}
          name={Name}
          capitalize={capitalizeFirstLetter}
        />
      </div>
    </div>
  );
}

export default Pokemon;
