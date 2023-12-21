import { useState } from "react";
import { PuzzlesTabs } from "./PuzzlesTabs";
import { Cryptogram } from "./cryptogram/Cryptograms";
import { BingoInput } from "./bingo/BingoInput";
import { Wordsearch } from "./wordsearch/Wordsearch";
export interface IPuzzlesMenuProps {}

export function PuzzlesMenu(props: IPuzzlesMenuProps) {
  const [activePuzzle, setActivePuzzle] = useState("cryptogram");

  return (
    <div>
      <PuzzlesTabs
        setActivePuzzle={setActivePuzzle}
        activePuzzle={activePuzzle}
      >
        {activePuzzle === 'cryptogram' && <Cryptogram />}
        {activePuzzle === 'bingo' && <BingoInput />}
        {activePuzzle === "wordsearch" && <Wordsearch />}
      </PuzzlesTabs>
    </div>
  );
}
