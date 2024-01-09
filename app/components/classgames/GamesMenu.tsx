import { useState } from "react";
import { GamesTabs } from "./GamesTabs";
import { Memory } from "./memory/Memory";
import { Minefield } from "./minefield/Minefield";
import { SpotIt } from "./spotit/SpotIt";
import { PictureReveal } from "./picturereveal/PictureReveal";
import { Jeopardy } from "./jeopardy/Jeopardy";

export interface IGamesMenuProps {}

export function GamesMenu(props: IGamesMenuProps) {
  const [activeGame, setActiveGame] = useState("memory");

  return (
    <div>
      <GamesTabs setActiveGame={setActiveGame} activeGame={activeGame}>
        {activeGame === "memory" && <Memory />}
        {activeGame === "minefield" && <Minefield />}
        {activeGame === 'spotit' && <SpotIt />}
        {activeGame === "picturereveal" && <PictureReveal />}
        {activeGame === "jeopardy" && <Jeopardy />}
      </GamesTabs>
    </div>
  );
}
