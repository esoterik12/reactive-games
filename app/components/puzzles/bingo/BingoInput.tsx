import { useRef, useState } from "react";
import classes from "./BingoInput.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import bingoGenerator from "@/utils/puzzle-generators/bingoGenerator";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import validateBingoInput from "@/utils/validation/validateBingo";
import jsPDF from "jspdf";
// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function BingoInput() {
  const [bingoInput, setBingoInput] = useState<string | undefined>();
  const [bingoTitle, setBingoTitle] = useState<string>("");
  const [numOfCards, setNumOfCards] = useState<number>(12);
  const [bingoOutput, setBingoOutput] = useState<any>();
  const bingoRef = useRef<any>(null);
  const dispatch = useDispatch();

  function handleSubmit() {
    try {
      if (bingoInput) {
        const wordsArray = bingoInput.split(",").map((ele) => ele.trim());
        validateBingoInput(wordsArray, bingoTitle, numOfCards); // validates
        setBingoOutput(bingoGenerator(wordsArray, bingoTitle, numOfCards)); //  generates
        console.log("Bingo output success: ", bingoOutput);
      }
    } catch (error) {
      console.log("Error generating bingo output: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  function handleReset() {
    setBingoInput("");
    setBingoTitle("");
    setBingoOutput(null);
  }

  // this pdf export has some scaling issues
  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    doc.html(bingoRef.current, {
      x: 44,
      y: 0,
      html2canvas: {
        scale: 0.241415,
      },
      async callback(doc) {
        doc.save("bingoOutput");
      },
    });
  };

  async function handleGeneratePDF() {
    await generatePDF();
  }

  //  counts number of words but splitting input array into words, trimming each word, and filtering out empty array elements
  let bingoWordCount: number | undefined = 0;
  if (bingoInput) {
    bingoWordCount = (bingoInput
      ?.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)).length;
  }

  return (
    <div className={classes.bingoContainer}>
      {!bingoOutput && (
        <div className={classes.bingoInput}>
          <h2>Bingo Card Generator</h2>
          <p>Enter 25 words separated by commas to create bingo cards!</p>

          {bingoWordCount === 1 ? (
            <p>You have entered {bingoWordCount} word so far.</p>
          ) : (
            <p>You have entered {bingoWordCount} words so far.</p>
          )}
          <GenInputField
            stateUpdatingFunction={setBingoTitle}
            name="bingoTitle"
            type="text"
            label="Enter a title:"
            value={bingoTitle}
          />
          <GenInputField
            stateUpdatingFunction={setNumOfCards}
            name="numberOfCards"
            type="number"
            label="Enter the number of cards:"
            value={numOfCards}
          />
          <GenInputField
            stateUpdatingFunction={setBingoInput}
            name="bingoWords"
            type="text"
            label="Enter your bingo words:"
            value={bingoInput}
          />
          <button onClick={handleSubmit}>Generate</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      {bingoOutput && (
        <div className={classes.bingoContainer}>
          <h2>Preview your Bingo Cards:</h2>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGeneratePDF}>Download PDF</button>
          </div>
          <div ref={bingoRef} className={classes.bingoOutputContainer}>
            {bingoOutput.bingoArray.map((array: [], index: number) => (
              <div className={classes.cardContainer} key={index}>
                <h3 className={classes.title}>Card #{index + 1}</h3>
                <div className={classes.gridContainer}>
                  {array.map((word, subIndex) => (
                    <div key={`${index}${subIndex}`} className={classes.item}>
                      <p>{word}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
