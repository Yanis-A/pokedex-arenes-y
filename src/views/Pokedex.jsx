import PokemonList from "../components/PokemonList";
import { useSelector } from "react-redux";

function Pokedex() {
  const { team } = useSelector(
    (state) => state.globalProps
  );

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center my-3">
        <h1>Pokedex</h1>
        <p className="text-secondary mb-4">Manage your Pokémon team here!</p>
        <PokemonList ids={team} />
      </div>
    </div>
  )
}

export default Pokedex
