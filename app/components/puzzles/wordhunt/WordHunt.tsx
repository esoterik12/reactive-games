import wordErrorGenerator from "@/utils/puzzle-generators/wordhuntGenerator";
import * as React from "react";
import { GenInputField } from "../../common/input/GenInputField";

export interface IWordHuntProps {}

// process input words (string sp commas) into an array
// create a new array for the errors
// edit each element in the array to add, remove, or duplicate a letter
// prioritize certain letters (randomly)
// for example vowels, similar letters, etc

// use RDK state to handle? or attempt to use useReducer
// as a learning process
const DUMMY_WORDS = [
  "ask",
  "amble",
  "attitude",
  "array",
  "apple",
  "aggressive",
  "access",
  "glad",
  "sky",
];

export function WordHunt(props: IWordHuntProps) {
  const [wordHuntInput, setWordHuntInput] = React.useState([]);
  const [wordHuntTitle, setWordHuntTitle] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);

  function handleClick() {
    wordErrorGenerator(DUMMY_WORDS);
  }

  return (
    <div>
      <GenInputField
        name="title"
        label="title"
        type="text"
        value={wordHuntTitle}
        stateUpdatingFunction={setWordHuntTitle}
      />
      <GenInputField
        name="input"
        label="input"
        type="text"
        value={wordHuntInput}
        stateUpdatingFunction={setWordHuntInput}
      />
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
