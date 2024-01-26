import { useState, useRef } from "react";
import classes from "./Bingo.module.css";
import { BingoInput } from "./BingoInput";
import { BingoOutput } from "./BingoOutput";
import { SaveButton } from "../../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";
// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function Bingo() {
  const [bingoOutput, setBingoOutput] = useState<any>();
  const [bingoInput, setBingoInput] = useState<string | undefined>();
  const [bingoTitle, setBingoTitle] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setBingoInput("");
    setBingoTitle("");
    setBingoOutput(null);
  }

  function handleGeneratePDF() {
    generatePDF(printRef.current, "BingoPDF");
  }

  // Save Object //
  const bingoSave = {
    title: bingoTitle,
    output: bingoOutput,
    dataType: "bingo",
  };

  return (
    <div className={classes.bingoContainer}>
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
          <div className={classes.outputButtonsContainer}>
            <SaveButton
              saveObject={bingoSave}
              saved={saved}
              setSaved={setSaved}
            />
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <button onClick={handleReset}>Reset</button>
          </div>
          <BingoOutput bingoOutput={bingoOutput} printRef={printRef} />
        </>
      )}
    </div>
  );
}
