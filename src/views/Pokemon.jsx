import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPokemonById } from "../service/service";
import { useState, useEffect } from "react";
import Error from "../components/Error";
import { capitalizeFirstLetter, getEmojiForType } from "../service/utils";
import styles from "../styles/typeColors.module.css";
import { useSelector, useDispatch } from "react-redux";
import { togglePokemonInTeam } from "../service/globalPropsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Pokemon() {
  const { team } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  if (id < 1 || id > 1010) {
    navigate("/nopokemon");
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonById(id);
        console.log(`Details of ${id}: `, data);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`"Error fetching pokemon #${id}: "`, error);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [id]);

  const Image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

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

  const Name = pokemon && pokemon.name ? capitalizeFirstLetter(pokemon.name) : "???";
  const Types = pokemon && pokemon.types;
  const FirstType = Types && Types[0].type.name;
  const LastType = Types && Types[Types.length - 1].type.name;
  const Height = pokemon && (pokemon.height / 10).toFixed(1) + "m";
  const Weight = pokemon && (pokemon.weight / 10).toFixed(1) + "kg";
  const Abilities = pokemon && pokemon.abilities;
  const MinPokemon = 1;
  const MaxPokemon = 1010;

  const handleToggleTeam = () => {
    pokemon && dispatch(togglePokemonInTeam({ id, name: Name }));
  };

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  return (
    <div
      className={`${
        styles[`${LastType}_light`]
      } container-fluid d-flex flex-column flex-lg-row position-relative`}
      style={{ minHeight: "90vh" }}
    >
      {isPokemonInTeam && (
        <div className="position-absolute top-0 end-0 m-3">
          <span
            className={
              "badge fw-normal fs-6 m-1 py-2 rounded-pill " + styles.pokeball_red_bg
            }
          >
            In your team!
          </span>
        </div>
      )}
      {id > MinPokemon && (
        <Link
          to={`/pokemon/${+id - 1}`}
          className="position-absolute top-50 start-0 translate-middle-y m-3"
        >
          <button className="btn btn-outline-dark" title="Previous Pokémon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
      )}
      {id < MaxPokemon && (
        <Link
          to={`/pokemon/${+id + 1}`}
          className="position-absolute top-50 end-0 translate-middle-y m-3"
        >
          <button className="btn btn-outline-dark" title="Next Pokémon">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </Link>
      )}
      <div className="py-3 py-lg-0 d-flex flex-grow-1 flex-column align-items-center justify-content-center text-center">
        <h1>#{id}</h1>
        <h1 className="fw-bold">{Name}</h1>
        <div style={{ maxWidth: "300px" }} className="my-3">
          <img
            src={Image}
            alt={Name}
            className={`rounded img-fluid ${styles[`${FirstType}_medium`]} ${
              styles[`shadow-${FirstType}`]
            }`}
          />
        </div>
        <button
          type="button"
          title={!isPokemonInTeam ? "Add to team" : "Remove from team"}
          onClick={handleToggleTeam}
          className="btn btn-outline-dark ms-1 flex-grow-0"
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
      <div className="d-flex flex-grow-1 flex-column align-items-center justify-content-center text-center">
        <p className="fs-5 mb-1 fw-semibold">
          {Types && Types.length > 1 ? "Types" : "Type"}
        </p>
        <div className="d-flex flex-row align-items center justify-content-center">
          {Types &&
            Types.map((type) => (
              <span
                key={type.type.name}
                className={
                  "badge fw-normal fs-6 m-1 py-1 rounded-pill text-black " +
                  styles[type.type.name]
                }
              >
                {`${capitalizeFirstLetter(type.type.name)} ${getEmojiForType(
                  type.type.name
                )}`}
              </span>
            ))}
        </div>
        {/* <hr style={{width: "300px"}} className="border border-secondary border-1 opacity-50" /> */}
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="mx-3">
            <p className="fs-5 mb-1 fw-semibold">Height</p>
            <p className="fs-6">{Height}</p>
          </div>
          <div className="mx-3">
            <p className="fs-5 mb-1 fw-semibold">Weight</p>
            <p className="fs-6">{Weight}</p>
          </div>
        </div>
        {/* <hr style={{width: "300px"}} className="border border-secondary border-1 opacity-50" /> */}
        <p className="fs-5 mb-1 fw-semibold">
          {Abilities && Abilities.length > 1 ? "Abilities" : "Ability"}
        </p>
        <div className="d-flex flex-row align-items center justify-content-center">
          {Abilities &&
            Abilities.map((ability) => (
              <span
                key={ability.ability.name}
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
          <>
            <p className="fs-5 mb-1 fw-semibold">Base experience</p>
            <p className="fs-6">{pokemon && pokemon.base_experience}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Pokemon;
