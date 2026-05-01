import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/typeColors.module.css";
import unknown_pokemon from "../assets/unknown_pokemon.gif";
import { useCountdown } from "../service/utils";

function NoPokemon() {
  const navigate = useNavigate();
  const countdown = useCountdown(6, 1000);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="container-fluid m-auto">
      <div className="d-flex flex-column align-items-center justify-content-center my-3">
        <img src={unknown_pokemon} alt="Unknown pokemon" className="rounded" />
        <h1>Uh oh...</h1>
        <p>This pokemon doesn&apos;t (currently) exist or isn&apos;t in our database.</p>
        {countdown > 1 ? (
          <p>Redirecting to the home page in {countdown - 1} seconds...</p>
        ) : (
          <p>Redirecting to the home page...</p>
        )}
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
