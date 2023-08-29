import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoV2.png";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/typeColors.module.css";
import { setSearch } from "../service/globalPropsSlice";
import { useEffect } from "react";
// import InstallButton from "./InstallButton";

function Navigation() {
  const { team, search } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();
  const location = useLocation();

  const isPokemonPage = location.pathname.startsWith('/pokemon/');

  useEffect(() => {
    dispatch(setSearch(""));
  }, [location.pathname, dispatch]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    dispatch(setSearch(value));
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary shadow">
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
            {!isPokemonPage && <li className="nav-item">
              <div className="input-group py-lg-0 py-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Pokémon by name"
                  aria-label="Search Pokémon by name"
                  value={search || ""}
                  onChange={handleSearchChange}
                />
              </div>
            </li>}
          </ul>
          <ul className="navbar-nav ml-auto my-0 mb-2 mb-lg-0 py-2 py-lg-0">
            {/* <li className="nav-item my-1 my-lg-auto me-0 me-lg-3">
              <InstallButton />
            </li> */}
            <li className="nav-item">
              <Link to="/pokedex" className="nav-link">
                <button
                  type="button"
                  title="See in Pokedex"
                  className={"btn text-white " + styles.pokeball_red_bg}
                >
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
