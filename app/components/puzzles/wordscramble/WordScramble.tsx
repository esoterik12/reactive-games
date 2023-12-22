import { useRef, useState } from "react";
import classes from "./WordScramble.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import jsPDF from "jspdf";
import { scrambleGenerator } from "@/utils/puzzle-generators/scrambleGenerator";
import { validateScramble } from "@/utils/validation/validateScramble";
// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function WordScramble() {
  const [scrambleInput, setScrambleInput] = useState<string | undefined>();
  const [scrambleTitle, setScrambleTitle] = useState<string>("");
  const [scrambleOutput, setScrambleOutput] = useState<any>();
  const scrambleRef = useRef<any>(null);
  const dispatch = useDispatch();

  function handleSubmit() {
    try {
      if (scrambleInput) {
        const wordsArray = scrambleInput.split(",").map((ele) => ele.trim()); // cleans and sorts input into array
        validateScramble(wordsArray, scrambleTitle)// validates
        setScrambleOutput(scrambleGenerator(wordsArray)); // generates
      }
    } catch (error) {
      console.log("Error generating scramble output: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  console.log("Scramble output success: ", scrambleOutput);

  function handleReset() {
    setScrambleInput("");
    setScrambleTitle("");
    setScrambleOutput(null);
  }

  const generatePDF = async () => {
    const pixelWidth = 595; // A4 width in pixels
    const pixelHeight = 842; // A4 height in pixels

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pixelWidth, pixelHeight],
    });

    doc.html(scrambleRef.current, {
      x: 0,
      y: 0,
      html2canvas: {
        scale: 1,
      },
      async callback(doc) {
        doc.save("wordscrambleOutput");
      },
    });
  };

  async function handleGeneratePDF() {
    await generatePDF();
  }

  //  counts number of words but splitting input array into words, trimming each word, and filtering out empty array elements
  let scrambleWordCount: number | undefined = 0;
  if (scrambleInput) {
    scrambleWordCount = (scrambleInput
      ?.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)).length;
  }

  return (
    <div className={classes.scrambleContainer}>
      {!scrambleOutput && (
        <div className={classes.scrambleInput}>
          <h2>Word Scramble Generator</h2>
          <p>
            Enter words separated by commas to create scrambled word puzzles!
          </p>
          <p>Enter a maximum of 24 words. Multiples of 4 work best for formatting.</p>
          <p>
            wonderful, all, is, a, I, big, queen, well, egg, real, trap, cream,
            veal, bean, need, mend, hurt, hand, hippo, hole, india, igloo, ice, imbecile
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
      )}
      {scrambleOutput && (
        <div className={classes.scrambleContainer}>
          <h2>Preview your Puzzles:</h2>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGeneratePDF}>Download PDF</button>
          </div>
          <div ref={scrambleRef} className={classes.pdfContainer}>
            <h2>{scrambleTitle}</h2>
            <h4>Name: _____________</h4>
            <div className={classes.scrambleOutputContainer}>
              {scrambleOutput.map((word: string, index: number) => (
                <div className={classes.cardContainer} key={index}>
                  <p>{word}</p>
                  <p>_____________</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
