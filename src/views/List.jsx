import PokemonList from "../components/PokemonList";
import Logo from "../assets/logoV2.png";
import styles from "../styles/typeColors.module.css";

function List() {
  // Greet the user with a random adjective
  const adjectives = [
    'skilled',
    'dedicated',
    'knowledgeable',
    'resourceful',
    'courageous',
    'passionate',
    'wise',
    'insightful',
    'determined',
    'charismatic',
  ];
  const randomIndex = Math.floor(Math.random() * adjectives.length);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center my-3 fs-5">
        <img width={300} src={Logo} alt="ReactDex Logo" />
        <p>Welcome <span className={"fw-bold " + styles.pokeball_red}>{adjectives[randomIndex]}</span> trainer! 👋</p>
        <p className="fs-2 mb-4">Set up your team!</p>
        <PokemonList />
      </div>
    </div>
  )
}

export default List
