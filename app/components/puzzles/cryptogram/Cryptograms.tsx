import * as React from "react";
import { useState } from "react";
import { GenInputField } from "../../input/GenInputField";
import classes from "./Cryptograms.module.css";
import cryptogramGenerator from "@/utils/puzzle-generators/cryptogramGenerator";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import validateCryptogram from "@/utils/validation/validateCryptogram";
import { CryptogramOutput } from "./CryptogramOutput";
import { SaveButton } from "../../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";

export function Cryptogram() {
  const [cryptogramInput, setCryptogramInput] = useState("");
  const [givenAnswers, setGivenAnswers] = useState<string>("");
  const [cryptogramOutput, setCryptogramOutput] = useState<[] | null>(null);
  const [saved, setSaved] = useState(false)
  const printRef = React.useRef<any>(null);
  const dispatch = useDispatch();

  function handleGeneratePDF() {
    generatePDF(printRef.current, "CryptogramPDF", 10, 4, 1, "p");
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
    setGivenAnswers("");
    setCryptogramOutput(null);
  }

  const cryptogramSave = {
    title: "placeholderTitleCrypto",
    output: cryptogramOutput,
    dataType: "cryptogram",
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
        <div>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <button onClick={handleReset}>Reset</button>
            <SaveButton saved={saved} setSaved={setSaved} saveObject={cryptogramSave}/>
          </div>
          <CryptogramOutput printRef={printRef} cryptogramOutput={cryptogramOutput} />
        </div>
      )}
    </div>
  );
}
