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

// Styling
import styles from "../styles/typeColors.module.css";
import stylesPokemon from "../styles/pokemon.module.css";

// Constants
import { STORAGE_NAME } from "../service/localStorage";
import PokemonNavigation from "../components/PokemonNavigation";
import PokemonEvolutions from "../components/PokemonEvolutions";
import PokemonSpeciesItem from "../components/PokemonSpeciesItem";

function Pokemon() {
  const { team } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let { id } = useParams();
  // Make id a number back
  id = +id;

  const MinPokemon = 1;
  const MaxPokemon = 1010;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPokemonById(id);
        setPokemon(data);

        const data_species = await fetchPokemonSpeciesById(id);
        setPokemonSpecies(data_species);

        const data_evolution = await fetchPokemonEvolutionChain(
          data_species?.evolution_chain?.url
        );
        setEvolutionChain(data_evolution);

        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`"Error fetching pokemon #${id} info: "`, error);
        setLoading(false);
      }
    };
    //Making sure the data isn't fetched if fatal parameters are incorrect to avoid error flood
    if (id < MinPokemon || id > MaxPokemon) {
      navigate("/nopokemon");
    } else if (isNaN(id)) {
      navigate("/notfound");
    } else {
      fetchPokemonData();
    }
    //Preventing unwanted behavior
  }, [id, navigate]);

  // Main constants with data presence check
  let Image = "";
  if (!isNaN(id) || id > MinPokemon || id < MaxPokemon) {
    Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  const Name =
    pokemon && pokemon.name ? capitalizeFirstLetter(pokemon.name) : "???";
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

  // Pokedex handling
  const handleToggleTeam = () => {
    if (pokemon) {
      dispatch(togglePokemonInTeam({ id, name: pokemon.name }));
      const updatedTeam = team.some((p) => p.id === id)
        ? team.filter((p) => p.id !== id)
        : [...team, { id, name: pokemon.name }];
      localStorage.setItem(STORAGE_NAME, JSON.stringify(updatedTeam));
    }
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  //Rendered while loading or in case of error
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error err={error.message} />;
  }

  return (
    <div
      className="container-fluid d-flex flex-column flex-lg-row position-relative"
      style={{
        minHeight: "90vh",
        backgroundColor: getColorForType(Types ? LastType : "", 0.1),
      }}
    >
      {/* Navigation through available pokemons */}
      <PokemonNavigation id={id} min={MinPokemon} max={MaxPokemon} />
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
        <div className="d-flex flex-row align-items center justify-content-center mb-1">
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
        <div className="d-flex flex-row align-items center justify-content-center mb-1">
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
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center mb-1">
          {pokemon && pokemon.stats && (
            <div className="mx-3">
              <p className="fs-5 mb-1 fw-semibold">Total</p>
              <p className="fs-6 mb-1">
                {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
              </p>
            </div>
          )}
          {pokemon && pokemon.stats && (
            <div className="mx-3">
              <p className="fs-5 mb-1 fw-semibold">Average</p>
              <p className="fs-6 mb-1">
                {(
                  pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0) /
                  pokemon.stats.length
                ).toFixed(2)}
              </p>
            </div>
          )}
        </div>
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
            {pokemonSpecies && pokemonSpecies.egg_group && (
              <div className="mx-3">
                <p className="fs-5 mb-1 fw-semibold">Egg groups</p>
                <p className="fs-6 mb-1">
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
                </p>
              </div>
            )}
          </div>
        </div>
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
