import { useState } from "react";
import PokemonList from "../components/PokemonList";
import styles from "../styles/typeColors.module.css";

const ADJECTIVES = [
  "skilled",
  "dedicated",
  "knowledgeable",
  "resourceful",
  "courageous",
  "passionate",
  "wise",
  "insightful",
  "determined",
  "charismatic",
];

function List() {
  const [adjective] = useState(
    () => ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  );

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center my-3 fs-5">
        <p className="mb-1">
          Welcome{" "}
          <span className={"fw-bold " + styles.pokeball_red}>{adjective}</span>{" "}
          trainer! 👋
        </p>
        <p className="fs-2 mb-4">Set up your team!</p>
        <PokemonList />
      </div>
    </div>
  );
}

export default List;
