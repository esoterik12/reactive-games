import { useState, useRef } from "react";
import classes from "./Wordsearch.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import { multiWordsearchGenerator } from "@/utils/puzzle-generators/wordsearchGenerator";
import { validateWordSearchInput } from "@/utils/validation/validateWordsearch";
import { WordsearchOutput } from "./WordsearchOutput";
import { SaveButton } from "../../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";

export function Wordsearch() {
  const [wordsearchInput, setWordsearchInput] = useState<string>("");
  const [wordsearchTitle, setWordsearchTitle] = useState<string>("");
  const [numOfVersions, setNumOfVersions] = useState<string>("1");
  const [gridSize, setGridSize] = useState<string>("12");
  const [saved, setSaved] = useState(false);
  const [wordsearchOutput, setWordsearchOutput] = useState<any[] | null>();
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  function handleSubmit() {
    try {
      const wordsArray: string[] = wordsearchInput
        .split(",")
        .map((ele) => ele.trim());
      validateWordSearchInput(
        wordsArray,
        wordsearchTitle,
        numOfVersions,
        gridSize
      ); // validates
      setWordsearchOutput(
        multiWordsearchGenerator(
          wordsArray,
          parseInt(numOfVersions),
          parseInt(gridSize)
        )
      ); //  generates - , wordsearchTitle, numOfVersions
    } catch (error) {
      console.log("Error generating wordsearch output: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  function handleReset() {
    setWordsearchInput("");
    setWordsearchTitle("");
    setWordsearchOutput(null);
    setNumOfVersions("1");
    setGridSize("12");
  }

  function handleGeneratePDF() {
    generatePDF(printRef.current, "BingoPDF");
  }

  const wordsearchSave = {
    title: wordsearchTitle,
    output: { wordsearchOutput, wordsearchInput },
    dataType: "wordsearch",
  };

  return (
    <div className={classes.wordsearchContainer}>
      {!wordsearchOutput && (
        <div className={classes.wordsearchInput}>
          <h2>Wordsearch Generator</h2>
          <p>Enter words separated by commas to create a wordsearch!</p>
          <p>
            queen, well, egg, reality, trap, yes, up, indifferent, octopus, punt
          </p>

          <GenInputField
            stateUpdatingFunction={setWordsearchTitle}
            name="wordsearchTitle"
            type="text"
            label="Enter a title:"
            value={wordsearchTitle}
          />
          <div className={classes.numberInputs}>
            <GenInputField
              stateUpdatingFunction={setNumOfVersions}
              name="numberOfCards"
              type="number"
              label="Create different versions:"
              value={numOfVersions}
            />
            <GenInputField
              stateUpdatingFunction={setGridSize}
              name="size"
              type="number"
              label="Select your grid size - max. 15:"
              value={gridSize}
            />
          </div>

          <GenInputField
            stateUpdatingFunction={setWordsearchInput}
            name="wordsearchWords"
            type="text"
            label="Enter your wordsearch words:"
            value={wordsearchInput}
          />
          <button onClick={handleSubmit}>Generate</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      {wordsearchOutput && (
        <div className={classes.outputButtonsContainer}>
          <SaveButton
            saveObject={wordsearchSave}
            saved={saved}
            setSaved={setSaved}
          />
          <button onClick={handleGeneratePDF}>Download PDF</button>
          <button onClick={handleReset}>Reset</button>
          <WordsearchOutput
            wordsearchOutput={wordsearchOutput}
            wordsearchTitle={wordsearchTitle}
            wordsearchInput={wordsearchInput}
            printRef={printRef}
          />
        </div>
      )}
    </div>
  );
}
