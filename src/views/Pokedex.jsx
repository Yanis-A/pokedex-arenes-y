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
        {team.length > 0 ? <PokemonList teamArray={team} /> :
        (
          <>
            <p className="text-secondary fs-4">You don&apos;t have any Pokémon in your team yet!</p>
            <img src="https://thumbs.gfycat.com/EachWellinformedAidi-size_restricted.gif" alt="Empty PokeBall" className="rounded" />
          </>
        )}
      </div>
    </div>
  )
}

export default Pokedex
