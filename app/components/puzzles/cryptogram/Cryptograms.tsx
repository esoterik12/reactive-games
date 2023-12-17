import * as React from "react";
import { useState } from "react";
import { GenInputField } from "../../input/GenInputField";
import classes from "./Cryptograms.module.css";
import cryptogramGenerator from "@/utils/puzzle-generators/cryptogramGenerator";
import jsPDF from "jspdf";

export function Cryptogram() {
  const [cryptogramInput, setCryptogramInput] = useState("");
  const [givenAnswers, setGivenAnswers] = useState<string>("");
  const [cryptogramOutput, setCryptogramOutput] = useState<[] | null>(null);

  const cryptoRef = React.useRef<any>(null);

  const generateObjectPDF = async () => {
    const doc = new jsPDF();

    doc.html(cryptoRef.current, {
      html2canvas: {
        scale: 0.3,
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
    const result = cryptogramGenerator(cryptogramInput, givenAnswers);
    setCryptogramOutput(result);
  }

  function handleReset() {
    setCryptogramOutput(null);
    setGivenAnswers("");
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
            You can give more letters to make the cryptogram easier to solve.
          </p>
          <p>This generator will remove all numbers and punctuation.</p>
          <GenInputField
            stateUpdatingFunction={setCryptogramInput}
            name="cryptogram"
            type="text"
            label="Enter a sentence to be decoded:"
          />
          <GenInputField
            stateUpdatingFunction={setGivenAnswers}
            name="givenAnswers"
            type="text"
            label="Enter given letters:"
          />
          <button onClick={handleSubmit}>Generate</button>
        </div>
      )}
      {cryptogramOutput && (
        <>
          <h2>Preview Output</h2>
          <div ref={cryptoRef} className={classes.cryptoOutput}>
            {cryptogramOutput.map((subArray: [], idx) => {
              return (
                <div key={idx} className={classes.cryptoOutput}>
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
