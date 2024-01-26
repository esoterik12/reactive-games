import { useState, useRef } from "react";
import classes from "./WordScramble.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import { scrambleGenerator } from "@/utils/puzzle-generators/scrambleGenerator";
import { validateScramble } from "@/utils/validation/validateScramble";
import { WordScrambleOutput } from "./WordScrambleOutput";
import { SaveButton } from "../../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";
// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function WordScramble() {
  const [scrambleInput, setScrambleInput] = useState<string>("");
  const [scrambleTitle, setScrambleTitle] = useState<string>("");
  const [scrambleOutput, setScrambleOutput] = useState<any>();
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  function handleSubmit() {
    try {
      if (scrambleInput) {
        const wordsArray = scrambleInput.split(",").map((ele) => ele.trim()); // cleans and sorts input into array
        console.log("wordsArray: ", wordsArray);

        validateScramble(wordsArray, scrambleTitle); // validates
        setScrambleOutput(scrambleGenerator(wordsArray)); // generates
      }
    } catch (error) {
      console.log("Error generating scramble output: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  function handleReset() {
    setScrambleInput("");
    setScrambleTitle("");
    setScrambleOutput(null);
    setSaved(false);
  }

  function handleGeneratePDF() {
    generatePDF(printRef.current, "BingoPDF");
  }

  // Save Object //
  const scrambleSave = {
    title: scrambleTitle,
    output: scrambleOutput,
    dataType: "scrambleOutput",
  };

  //  Counts number of words by splitting, trimming words, and filtering out empty elements
  let scrambleWordCount: number | undefined = 0;
  if (scrambleInput) {
    scrambleWordCount = (scrambleInput
      ?.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)).length;
  }

  return (
    <>
      {!scrambleOutput && (
        <div className={classes.scrambleContainer}>
          <div className={classes.scrambleInput}>
            <h2>Word Scramble Generator</h2>
            <p>
              Enter words separated by commas to create scrambled word puzzles!
            </p>
            <p>
              Enter a maximum of 24 words. Multiples of 4 work best for
              formatting.
            </p>
            <p>
              wonderful, all, is, a, I, big, queen, well, egg, real, trap,
              cream, veal, bean, need, mend, hurt, hand, hippo, hole, india,
              igloo, ice, imbecile
            </p>

            {scrambleWordCount === 1 ? (
              <p>You have entered {scrambleWordCount} word so far.</p>
            ) : (
              <p>You have entered {scrambleWordCount} words so far.</p>
            )}
            <GenInputField
              stateUpdatingFunction={setScrambleTitle}
              name="scrambleTitle"
              type="text"
              label="Enter a title:"
              value={scrambleTitle}
            />
            <GenInputField
              stateUpdatingFunction={setScrambleInput}
              name="scrambleWords"
              type="text"
              label="Enter your words to scramble:"
              value={scrambleInput}
            />
            <button onClick={handleSubmit}>Generate</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
      {scrambleOutput && (
        <div className={classes.scrambleContainer}>
          <h2>Preview your Puzzles:</h2>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleReset}>Reset</button>{" "}
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <SaveButton
              saveObject={scrambleSave}
              saved={saved}
              setSaved={setSaved}
            />
          </div>
          <WordScrambleOutput
            scrambleTitle={scrambleTitle}
            scrambleOutput={scrambleOutput}
            printRef={printRef}
          />
        </div>
      )}
    </>
  );
}
