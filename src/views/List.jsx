import PokemonList from "../components/PokemonList";
import Logo from "../assets/logoV2.png";

function List() {
  // Welcome the user
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
      <div className="d-flex flex-column align-items-center my-3">
        <img width={300} src={Logo} alt="ReactDex Logo" />
        <p className="fs-5">Welcome <span style={{color: "#ff0000"}} className="fw-bold">{adjectives[randomIndex]}</span> trainer! 👋</p>
        <h1>Find Pokémons</h1>
        <PokemonList />
      </div>
    </div>
  )
}

export default List
