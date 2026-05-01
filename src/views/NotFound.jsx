import { Link } from "react-router-dom";
import styles from "../styles/typeColors.module.css";
import not_found from "../assets/not_found.gif";

function NotFound() {
  return (
    <div className="container-fluid m-auto">
      <div className="d-flex flex-column align-items-center justify-content-center my-3">
        <img src={not_found} alt="Confused pokemon" className="rounded" />
        <h1>Not Found!</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
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

export default NotFound;
