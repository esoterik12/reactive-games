import { useState } from "react";
import { PuzzlesTabs } from "./PuzzlesTabs";
import { Cryptogram } from "./cryptogram/Cryptograms";
import { Bingo } from "./bingo/Bingo";
import { Wordsearch } from "./wordsearch/Wordsearch";
import { WordScramble } from "./wordscramble/WordScramble";
import { FindYourPartners } from "./findyourpartners/FindYourPartners";

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
        {activePuzzle === 'bingo' && <Bingo />}
        {activePuzzle === "wordsearch" && <Wordsearch />}
        {activePuzzle === "wordscramble" && <WordScramble />}
        {activePuzzle === "findyourpartner" && <FindYourPartners />}
      </PuzzlesTabs>
    </div>
  );
}
