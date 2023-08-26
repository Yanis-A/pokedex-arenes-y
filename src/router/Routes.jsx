import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../service/globalPropsSlice";
import { useEffect } from "react";

import List from "../views/List.jsx";
import Pokedex from "../views/Pokedex.jsx";
import Pokemon from "../views/Pokemon.jsx";
import NotFound from "../views/NotFound.jsx";
import NoPokemon from "../views/NoPokemon.jsx";

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(""));
  }, [dispatch]);

  return (
    <Routes>
      <Route exact path="/" Component={List} />
      <Route path="/pokedex" Component={Pokedex} />
      <Route path="/pokemon/:id" Component={Pokemon} />
      <Route path="/nopokemon" Component={NoPokemon} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default AppRoutes;
