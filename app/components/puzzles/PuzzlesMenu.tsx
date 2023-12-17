import { useState } from "react";
import { PuzzlesTabs } from "./PuzzlesTabs";
import { Cryptogram } from "./cryptogram/Cryptograms";
import { BingoPage } from "./bingo/Bingo";
export interface IPuzzlesMenuProps {}

interface ListItem {
  key: string;
  name: string;
}

export function PuzzlesMenu(props: IPuzzlesMenuProps) {
  const [activePuzzle, setActivePuzzle] = useState("cryptogram");
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <PuzzlesTabs
        setActivePuzzle={setActivePuzzle}
        activePuzzle={activePuzzle}
      >
        {activePuzzle === 'cryptogram' && <Cryptogram />}
        {activePuzzle === 'bingo' && <BingoPage />}
      </PuzzlesTabs>
    </div>
  );
}
