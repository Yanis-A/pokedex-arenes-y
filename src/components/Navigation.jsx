import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoV2.png";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/typeColors.module.css";
import { setSearch } from "../service/globalPropsSlice";
import { useEffect, useState } from "react";

const THEME_KEY = "reactdex_theme";

function Navigation() {
  const { team, search } = useSelector((state) => state.globalProps);

  const dispatch = useDispatch();
  const location = useLocation();

  const isPokemonPage = location.pathname.startsWith("/pokemon/");
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showNavLogo = !isHome || scrolled;

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    dispatch(setSearch(""));
  }, [location.pathname, dispatch]);

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary shadow">
      <div className="container-fluid">
        {showNavLogo && (
          <Link to="/" className="navbar-brand">
            <img width={150} src={logo} alt="ReactDex Logo" />
          </Link>
        )}
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
                Pokédex
              </Link>
            </li>
            {!isPokemonPage && (
              <li className="nav-item">
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
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto my-0 mb-2 mb-lg-0 py-2 py-lg-0 align-items-lg-center">
            <li className="nav-item me-lg-2 mb-2 mb-lg-0">
              <button
                type="button"
                onClick={() =>
                  setTheme((t) => (t === "light" ? "dark" : "light"))
                }
                title={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                aria-label="Toggle color theme"
                className="btn btn-outline-secondary"
              >
                <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
              </button>
            </li>
            <li className="nav-item">
              <Link
                to="/pokedex"
                title="See in Pokédex"
                className={"btn text-white " + styles.pokeball_red_bg}
              >
                My Team : {team.length} Pokémon
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
