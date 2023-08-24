import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/typeColors.module.css";

function NoPokemon() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="container-fluid m-auto">
      <div className="d-flex flex-column align-items-center justify-content-center my-3">
        <img
          src="https://i.gifer.com/7AAg.gif"
          alt="Unknown pokemon"
          className="rounded"
        />
        <h1>Uh oh...</h1>
        <p>This pokemon does&apos;t (currently) exist or isn&apos;t in our database.</p>
        {countdown > 1 ? (
          <p>Redirecting to the home page in {countdown - 1} seconds...</p>
        ) : (
          <p>Redirecting to the home page...</p>
        )}
        {!countdown && (
          <Link to="/">
            <button
              className={"btn" + styles.pokeball_red_bg}
              title="Take me back!"
            >
              Back to home page
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NoPokemon;
