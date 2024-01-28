import * as React from "react";
import { useState } from "react";
import { GenInputField } from "../../common/input/GenInputField";
import classes from "./Cryptograms.module.css";
import cryptogramGenerator from "@/utils/puzzle-generators/cryptogramGenerator";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import validateCryptogram from "@/utils/validation/validateCryptogram";
import { CryptogramOutput } from "./CryptogramOutput";
import { DefaultContainer } from "../../common/containers/DefaultContainer";

export function Cryptogram() {
  const [cryptogramInput, setCryptogramInput] = useState("");
  const [cryptogramTitle, setCryptogramTitle] = useState("");
  const [givenAnswers, setGivenAnswers] = useState("");
  const [cryptogramOutput, setCryptogramOutput] = useState<[] | null>(null);
  const printRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  function handleSubmit() {
    try {
      validateCryptogram(cryptogramInput, cryptogramTitle);
      const result = cryptogramGenerator(cryptogramInput, givenAnswers);
      setCryptogramOutput(result);
    } catch (error) {
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  function handleReset() {
    setCryptogramInput("");
    setCryptogramTitle("");
    setGivenAnswers("");
    setCryptogramOutput(null);
  }

  const cryptogramData = {
    save: {
      title: cryptogramTitle,
      output: cryptogramOutput,
      dataType: "cryptogram",
    },
    outputComplete: !!cryptogramOutput,
    pdfTitle: "CryptogramPDF",
  };

  return (
    <DefaultContainer
      printRef={printRef}
      resetFunction={handleReset}
      saveObject={cryptogramData}
    >
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
            stateUpdatingFunction={setCryptogramTitle}
            name="title"
            type="text"
            label="Enter a title:"
            value={cryptogramTitle}
          />
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
        <CryptogramOutput
          printRef={printRef}
          cryptogramOutput={cryptogramOutput}
        />
      )}
    </DefaultContainer>
  );
}
