import * as React from "react";
import { useState } from "react";
import { GenInputField } from "../../input/GenInputField";
import classes from "./Cryptograms.module.css";
import cryptogramGenerator from "@/utils/puzzle-generators/cryptogramGenerator";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import validateCryptogram from "@/utils/validation/validateCryptogram";

export function Cryptogram() {
  const [cryptogramInput, setCryptogramInput] = useState("");
  const [givenAnswers, setGivenAnswers] = useState<string>("");
  const [cryptogramOutput, setCryptogramOutput] = useState<[] | null>(null);
  const cryptoRef = React.useRef<any>(null);
  const dispatch = useDispatch();

  // configures jsPDF depending on input
  let pageScale: number = 0.43;
  let pageOrientation: "p" | "portrait" | "l" | "landscape" = "landscape";
  if (cryptogramOutput && cryptogramOutput.length > 3) {
    pageScale = 0.291;
    pageOrientation = "portrait";
  }

  const generateObjectPDF = async () => {
    const doc = new jsPDF({
      orientation: pageOrientation,
      unit: "mm",
      format: "a4",
    });

    doc.html(cryptoRef.current, {
      x: 13,
      y: 5,
      html2canvas: {
        scale: pageScale,
      },
      async callback(doc) {
        doc.save("output");
      },
    });
  };
  async function handleGeneratePDF() {
    await generateObjectPDF();
  }

  function handleSubmit() {
    try {
      validateCryptogram(cryptogramInput);
      const result = cryptogramGenerator(cryptogramInput, givenAnswers);
      setCryptogramOutput(result);
    } catch (error) {
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  function handleReset() {
    setCryptogramInput("");
    setGivenAnswers("")
    setCryptogramOutput(null);
  }

  return (
    <div className={classes.cryptogramContainer}>
      {!cryptogramOutput && (
        <div className={classes.cryptoInput}>
          <h2>Create a Cryptogram</h2>
          <p>
            This generator takes a sentence and outputs a cryptogram for players
            to decode.
          </p>
          <p>
            You can give certain letters to make the cryptogram easier to solve.
          </p>
          <p>This generator will remove all numbers and punctuation.</p>
          {!cryptogramInput ? (
            <p>Use a maximum of 120 characters.</p>
          ) : (
            <p>You have {120 - cryptogramInput.length} characters remaining.</p>
          )}
          <GenInputField
            stateUpdatingFunction={setCryptogramInput}
            name="cryptogram"
            type="text"
            label="Enter a sentence to be decoded:"
            value={cryptogramInput}
          />
          <GenInputField
            stateUpdatingFunction={setGivenAnswers}
            name="givenAnswers"
            type="text"
            label="Enter given letters:"
            value={givenAnswers}
          />
          <button onClick={handleSubmit}>Generate</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      {cryptogramOutput && (
        <>
          <h2>Preview Output</h2>

          <div ref={cryptoRef} className={classes.cryptoOutput}>
            <div>
              <p>Name:_____________ </p>
            </div>
            {cryptogramOutput.map((subArray: [], idx) => {
              return (
                <div key={idx} className={classes.cryptoOutputRow}>
                  {subArray.map((element, subIdx) => {
                    if (element === "  ") {
                      return (
                        <div key={`${idx}${subIdx}`}>
                          <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </div>
                      );
                    } else {
                      return (
                        <div key={`${idx}${subIdx}`}>
                          <p>{element}</p>
                          <p>__</p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}
