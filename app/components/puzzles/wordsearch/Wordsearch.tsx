import { useState, useRef } from "react";
import classes from "./Wordsearch.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../common/input/GenInputField";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import { multiWordsearchGenerator } from "@/utils/puzzle-generators/wordsearchGenerator";
import { validateWordSearchInput } from "@/utils/validation/validateWordsearch";
import { WordsearchOutput } from "./WordsearchOutput";
import { DefaultContainer } from "../../common/containers/DefaultContainer";

export function Wordsearch() {
  const [wordsearchInput, setWordsearchInput] = useState<string>("");
  const [wordsearchTitle, setWordsearchTitle] = useState<string>("");
  const [numOfVersions, setNumOfVersions] = useState<string>("1");
  const [gridSize, setGridSize] = useState<string>("12");
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
      );
      setWordsearchOutput(
        multiWordsearchGenerator(
          wordsArray,
          parseInt(numOfVersions),
          parseInt(gridSize)
        )
      );
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

  const wordsearchData = {
    save: {
      title: wordsearchTitle,
      output: { wordsearchOutput, wordsearchInput },
      dataType: "wordsearch",
    },
    outputComplete: !!wordsearchOutput,
    pdfTitle: "WordsearchPDF",
  };

  return (
    <DefaultContainer
      printRef={printRef}
      resetFunction={handleReset}
      saveObject={wordsearchData}
    >
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
        <WordsearchOutput
          wordsearchOutput={wordsearchOutput}
          wordsearchTitle={wordsearchTitle}
          wordsearchInput={wordsearchInput}
          printRef={printRef}
        />
      )}
    </DefaultContainer>
  );
}
