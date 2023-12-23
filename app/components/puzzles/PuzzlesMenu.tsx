import { useState } from "react";
import { PuzzlesTabs } from "./PuzzlesTabs";
import { Cryptogram } from "./cryptogram/Cryptograms";
import { BingoInput } from "./bingo/BingoInput";
import { Wordsearch } from "./wordsearch/Wordsearch";
import { WordScramble } from "./wordscramble/WordScramble";
import { FindYourPartner } from "./findyourpartner/FindYourPartner";
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
        {activePuzzle === 'bingo' && <BingoInput />}
        {activePuzzle === "wordsearch" && <Wordsearch />}
        {activePuzzle === "wordscramble" && <WordScramble />}
        {activePuzzle === "findyourpartner" && <FindYourPartners />}
      </PuzzlesTabs>
    </div>
  );
}
