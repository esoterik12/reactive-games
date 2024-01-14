import { useRef, useState } from "react";
import classes from "./Wordsearch.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import jsPDF from "jspdf";
import { multiWordsearchGenerator } from "@/utils/puzzle-generators/wordsearchGenerator";
import { validateWordSearchInput } from "@/utils/validation/validateWordsearch";

export function Wordsearch() {
  const [wordsearchInput, setWordsearchInput] = useState<string>("");
  const [wordsearchTitle, setWordsearchTitle] = useState<string>("");
  const [numOfVersions, setNumOfVersions] = useState<string>("1");
  const [gridSize, setGridSize] = useState<string>("12");
  const [wordsearchOutput, setWordsearchOutput] = useState<any[] | null>();
  const wordsearchRef = useRef<any>(null);
  const dispatch = useDispatch();

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

  const generatePDF = async () => {
    const pixelWidth = 595; // A4 width in pixels
    const pixelHeight = 842; // A4 height in pixels

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pixelWidth, pixelHeight],
    });

    doc.html(wordsearchRef.current, {
      x: 0,
      y: 0,
      html2canvas: {
        scale: 1,
      },
      async callback(doc) {
        doc.save("wordsearchOutput");
      },
    });
  };

  async function handleGeneratePDF() {
    await generatePDF();
  }

  return (
    <>
      {!wordsearchOutput && (
        <div className={classes.wordsearchContainer}>
          <div className={classes.wordsearchInput}>
            <h2>Wordsearch Generator</h2>
            <p>Enter words separated by commas to create a wordsearch!</p>
            <p>
              queen, well, egg, reality, trap, yes, up, indifferent, octopus,
              punt
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
        </div>
      )}
      {wordsearchOutput && (
        <div className={classes.wordsearchContainer}>
          <h2>Preview your Wordsearch:</h2>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGeneratePDF}>Download PDF</button>
          </div>
          <div ref={wordsearchRef} className={classes.pdfContainer}>
            {wordsearchOutput.map((versionArray, verIndex) => (
              <div
                className={classes.individualContainer}
                key={`ver-${verIndex}`}
              >
                <h3>
                  {wordsearchTitle} - #{verIndex + 1}
                </h3>
                {versionArray.map((outerArray: [], outIndx: number) => (
                  <div key={`row-${outIndx}`} className={classes.letterRow}>
                    {outerArray.map((letter: string, inIndx: number) => (
                      <p key={`row-${outIndx}-col-${inIndx}`}>{letter}</p>
                    ))}
                  </div>
                ))}
                <div className={classes.wordsToFind}>
                  {wordsearchInput
                    .split(",")
                    .map((ele) => ele.trim())
                    .map((word) => (
                      <p>{word}</p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
