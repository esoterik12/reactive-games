import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../common/input/GenInputField";
import classes from "./BingoInput.module.css";
import bingoGenerator from "@/utils/puzzle-generators/bingoGenerator";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import validateBingoInput from "@/utils/validation/validateBingo";

export interface IBingoInputProps {
  bingoInput: string | undefined;
  setBingoInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  bingoTitle: string;
  setBingoTitle: React.Dispatch<React.SetStateAction<string>>;
  bingoOutput: any;
  setBingoOutput: React.Dispatch<React.SetStateAction<any>>;
}

export function BingoInput(props: IBingoInputProps) {
  const { bingoInput, setBingoInput, bingoTitle, setBingoTitle } = props;
  const [numOfCards, setNumOfCards] = useState<number>(12);
  const dispatch = useDispatch();

  let bingoWordCount: number | undefined = 0;
  if (bingoInput) {
    bingoWordCount = (bingoInput
      ?.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)).length;
  }

  function handleSubmit() {
    try {
      if (bingoInput) {
        const wordsArray = bingoInput.split(",").map((ele) => ele.trim());
        validateBingoInput(wordsArray, bingoTitle, numOfCards);
        props.setBingoOutput(
          bingoGenerator(wordsArray, bingoTitle, numOfCards)
        );
        console.log("Bingo output success: ", props.bingoOutput);
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
    props.setBingoOutput(null);
  }

  return (
    <div className={classes.bingoInput}>
      <h2>Bingo Card Generator</h2>
      <p>Enter 25 words separated by commas to create bingo cards!</p>
      <p>
        queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal,
        door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean,
        need, mend
      </p>
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
      <button onClick={handleSubmit}>Create</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
