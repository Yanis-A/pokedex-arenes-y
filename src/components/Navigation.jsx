import { Link } from "react-router-dom";
import logo from "../assets/logoV2.png";


function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
            <li className="nav-item">
              <Link to="/" className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pokedex" className="nav-link">
                Pokedex
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto my-0 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/pokedex" className="nav-link">
                <button type="button" title="See in Pokedex" className="btn" style={{backgroundColor: "#ff0000", color: "#ffffff"}}>
                My Team : X Pokémons
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
