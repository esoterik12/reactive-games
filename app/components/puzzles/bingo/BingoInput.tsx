import { useState } from "react";
import classes from "./BingoInput.module.css";
import { useDispatch } from "react-redux";
import { GenInputField } from "../../input/GenInputField";
import bingoGenerator from "@/utils/puzzle-generators/bingoGenerator";

// queen, well, egg, real, trap, yes, up, in, octopus, punt, awake, seal, door, freeze, grow, help, jail, keen, lose, zeal, cream, veal, bean, need, mend

export function BingoInput() {
  const [bingoInput, setBingoInput] = useState<string>("");
  const [bingoTitle, setBingoTitle] = useState<string>("");
  const [numOfCards, setNumOfCards] = useState<number>(12);
  const [bingoOutput, setBingoOutput] = useState<any>();
  const dispatch = useDispatch();

  function handleSubmit() {
    const bingoCards = bingoGenerator(bingoInput, bingoTitle, numOfCards); // validates & generates
    setBingoOutput(bingoCards);
    console.log("bingoOutput: ", bingoOutput);
  }

  function handleReset() {
    setBingoInput("");
    setBingoTitle("");
    setBingoOutput(null);
  }

  return (
    <div className={classes.bingoContainer}>
      {!bingoOutput &&<div className={classes.bingoInput}>
        <h2>React Bingo Card Generator V1.0</h2>
        <p>Enter 25 words separated by commas to create bingo cards!</p>
        <p>You have entered {bingoInput.split(",").length} words so far.</p>
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
      </div>}
      {bingoOutput && (
        <div className={classes.bingoContainer}>
          <h2>Preview your Bingo Cards:</h2>
          <button onClick={handleReset}>Reset</button>
          {bingoOutput.bingoArray.map((array: [], index: number) => (
            <div key={index}>
              <h3 className={classes.title}>Card #{index + 1}</h3>
              <div className={classes.cardContainer}>
                {array.map((word, subIndex) => (
                  <div key={`${index}${subIndex}`} className={classes.item}><p>{word}</p></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
