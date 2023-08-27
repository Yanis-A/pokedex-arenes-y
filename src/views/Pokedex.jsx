import PokemonList from "../components/PokemonList";
import { useSelector } from "react-redux";
import pokedex_empty from "../assets/pokedex_empty.gif";

function Pokedex() {
  const { team } = useSelector(
    (state) => state.globalProps
  );

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center my-3">
        <h1>Pokédex</h1>
        <p className="fs-5 text-secondary mb-4">Manage your Pokémon team here!</p>
        {team.length > 0 ? <PokemonList teamArray={team} /> :
        (
          <>
            <img src={pokedex_empty} alt="Empty PokeBall" className="rounded" />
            <p className="fs-3">You don&apos;t have any Pokémon in your team yet!</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Pokedex
