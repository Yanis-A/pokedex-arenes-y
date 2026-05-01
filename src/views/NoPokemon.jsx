import { Link } from "react-router-dom";
import styles from "../styles/typeColors.module.css";
import unknown_pokemon from "../assets/unknown_pokemon.gif";

function NoPokemon() {
  return (
    <div className="container-fluid m-auto">
      <div className="d-flex flex-column align-items-center justify-content-center my-3">
        <img src={unknown_pokemon} alt="Unknown pokemon" className="rounded" />
        <h1>Uh oh...</h1>
        <p>This pokemon doesn&apos;t (currently) exist or isn&apos;t in our database.</p>
        <Link
          to="/"
          title="Take me back!"
          className={"btn text-white " + styles.pokeball_red_bg}
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}

export default NoPokemon;
