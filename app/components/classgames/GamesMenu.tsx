import { useState } from "react";
import { GamesTabs } from "./GamesTabs";
import { Memory } from "./memory/Memory";

export interface IGamesMenuProps {}

export function GamesMenu(props: IGamesMenuProps) {
  const [activeGame, setActiveGame] = useState("memory");

  return (
    <div>
      <GamesTabs setActiveGame={setActiveGame} activeGame={activeGame}>
        {activeGame === "memory" && <Memory />}
      </GamesTabs>
    </div>
  );
}
