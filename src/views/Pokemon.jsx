import { useParams } from "react-router-dom";
import { fetchPokemonById } from "../service/service";
import { useState, useEffect } from "react";
import Error from "../components/Error";
import { capitalizeFirstLetter, getEmojiForType } from "../service/utils";
import styles from "../styles/typeColors.module.css";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

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
    return <Error err={error.message} />
  }

  const Name = pokemon && pokemon.name ? capitalizeFirstLetter(pokemon.name) : "???";
  const Types = pokemon && pokemon.types;
  const FirstType = Types && Types[0].type.name;
  const Height = pokemon && (pokemon.height / 10).toFixed(1) + "m";
  const Weight = pokemon && (pokemon.weight / 10).toFixed(1) + "kg";

  return (
    <div className={`${styles[`${FirstType}_light`]} container-fluid d-flex flex-column flex-lg-row`} style={{minHeight: "90vh"}}>
      <div className="d-flex flex-grow-1 flex-column align-items-center justify-content-center text-center">
        <h1>#{id}</h1>
        <h1 className="fw-bold">{Name}</h1>
        <div style={{maxWidth: "300px"}} className="my-3">
          <img
            src={Image}
            alt={Name}
            className={`rounded img-fluid ${styles[`${FirstType}_medium`]} ${styles[`shadow-${FirstType}`]}`}
          />
        </div>
      </div>
      <div className="d-flex flex-grow-1 flex-column align-items-center justify-content-center text-center">
        <p className="fs-5 mb-1 fw-semibold">{Types && Types.length > 1 ? "Types" : "Type"}</p>
        <div className="d-flex flex-row align-items center justify-content-center">
          {Types && Types.map((type) => (
            <span
              key={type.type.name}
              className={"badge fw-normal fs-6 m-1 py-1 rounded-pill " + styles[type.type.name]}
            >
              {`${capitalizeFirstLetter(type.type.name)} ${getEmojiForType(type.type.name)}`}
            </span>
          ))}
        </div>
        <hr style={{width: "300px"}} className="border border-secondary border-1 opacity-50" />
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
      </div>
    </div>
  )
}

export default Pokemon;
