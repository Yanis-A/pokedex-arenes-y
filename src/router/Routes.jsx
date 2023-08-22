import { Route, Routes } from "react-router-dom";
import List from "../views/List.jsx";
import Pokedex from "../views/Pokedex.jsx";
import Pokemon from "../views/Pokemon.jsx";
import NotFound from "../views/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" Component={List}></Route>
      <Route path="/pokedex" Component={Pokedex}></Route>
      <Route path="/pokemon/:id" Component={Pokemon}></Route>
      <Route path="*" Component={NotFound}></Route>
    </Routes>
  )
}

export default AppRoutes;
