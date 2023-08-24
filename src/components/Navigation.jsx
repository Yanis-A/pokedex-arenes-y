import { Link } from "react-router-dom";
import logo from "../assets/logoV2.png";
import { useSelector } from "react-redux";
import styles from "../styles/typeColors.module.css";

function Navigation() {
  const { team } = useSelector(
    (state) => state.globalProps
  );

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img width={150} src={logo} alt="ReactDex Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-0">
            <li className="nav-item d-flex align-items-center ms-1 ms-lg-0">
              <Link to="/" className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-1 ms-lg-0">
              <Link to="/pokedex" className="nav-link">
                Pokedex
              </Link>
            </li>
            <li className="nav-item">
            <div className="input-group py-lg-0 py-2">
              <input type="text" className="form-control" placeholder="Search Pokémon" aria-label="Search Pokémon" aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2">🔎</button>
            </div>

            </li>
          </ul>
          <ul className="navbar-nav ml-auto my-0 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/pokedex" className="nav-link">
                <button type="button" title="See in Pokedex" className={"btn text-white " + styles.pokeball_red_bg}>
                  My Team : {team.length} Pokémon{team.length !== 1 ? "s" : ""}
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
