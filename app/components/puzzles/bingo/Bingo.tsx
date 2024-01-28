import { useState, useRef } from "react";
import { BingoInput } from "./BingoInput";
import { BingoOutput } from "./BingoOutput";
import { DefaultContainer } from "../../common/containers/DefaultContainer";
// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function Bingo() {
  const [bingoOutput, setBingoOutput] = useState<any>();
  const [bingoInput, setBingoInput] = useState<string | undefined>();
  const [bingoTitle, setBingoTitle] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setBingoInput("");
    setBingoTitle("");
    setBingoOutput(null);
  }

  const bingoData = {
    save: {
      title: bingoTitle,
      output: bingoOutput,
      dataType: "bingo",
    },
    outputComplete: !!bingoOutput,
    pdfTitle: "BingoPDF",
  };

  return (
    <DefaultContainer
      printRef={printRef}
      resetFunction={handleReset}
      saveObject={bingoData}
    >
      {!bingoOutput && (
        <BingoInput
          bingoOutput={bingoOutput}
          setBingoOutput={setBingoOutput}
          bingoTitle={bingoTitle}
          setBingoTitle={setBingoTitle}
          bingoInput={bingoInput}
          setBingoInput={setBingoInput}
        />
      )}
      {bingoOutput && (
        <>
          <BingoOutput bingoOutput={bingoOutput} printRef={printRef} />
        </>
      )}
    </DefaultContainer>
  );
}
