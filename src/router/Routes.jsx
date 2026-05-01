import { Route, Routes } from "react-router-dom";

import List from "../views/List.jsx";
import Pokedex from "../views/Pokedex.jsx";
import Pokemon from "../views/Pokemon.jsx";
import NotFound from "../views/NotFound.jsx";
import NoPokemon from "../views/NoPokemon.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
      <Route path="/nopokemon" element={<NoPokemon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
