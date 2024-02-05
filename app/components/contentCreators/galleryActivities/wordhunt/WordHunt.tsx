// Reducer setup below component
import wordErrorGenerator from "@/utils/puzzle-generators/wordhuntGenerator";
import * as React from "react";
import { GenInputField } from "../../../common/input/GenInputField";
import { DefaultContainer } from "@/app/components/common/containers/DefaultContainer";

// process input words (string sp commas) into an array
// create a new array for the errors
// edit each element in the array to add, remove, or duplicate a letter
// prioritize certain letters (randomly)
// for example vowels, similar letters, etc

export interface IWordHuntProps {}

export function WordHunt(props: IWordHuntProps) {
  const [state, dispatch] = React.useReducer(reducer, initialWordHuntState);
  const printRef = React.useRef<HTMLDivElement>(null);

  function handleClick() {
    wordErrorGenerator(DUMMY_WORDS);
    dispatch({ type: "SET_SUBMITTED", payload: true });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  // Save Object //
  const scrambleData = {
    save: {
      title: state.wordHuntTitle,
      output: state.wordHuntInput, // EDIT WITH OUTPUT
      dataType: "wordHunt",
    },
    outputComplete: state.submitted,
    pdfTitle: "WordHuntPDF",
  };

  return (
    <DefaultContainer
      resetFunction={handleReset}
      saveObject={scrambleData}
      printRef={printRef}
    >
      <GenInputField
        name="title"
        label="title"
        type="text"
        value={state.wordHuntTitle}
        stateUpdatingFunction={(value) =>
          dispatch({ type: "SET_WORD_HUNT_TITLE", payload: value })
        }
      />
      <GenInputField
        name="input"
        label="input"
        type="text"
        value={state.wordHuntInput}
        stateUpdatingFunction={(value) =>
          dispatch({ type: "SET_WORD_HUNT_INPUT", payload: value })
        }
      />
      <button onClick={handleClick}>Click</button>
    </DefaultContainer>
  );
}

interface WordHuntState {
  wordHuntInput: string[];
  wordHuntTitle: string;
  submitted: boolean;
}

const initialWordHuntState: WordHuntState = {
  wordHuntInput: [],
  wordHuntTitle: "",
  submitted: false,
};

type Action =
  | { type: "SET_WORD_HUNT_INPUT"; payload: string[] }
  | { type: "SET_WORD_HUNT_TITLE"; payload: string }
  | { type: "SET_SUBMITTED"; payload: boolean }
  | { type: "RESET" };

function reducer(state: WordHuntState, action: Action): WordHuntState {
  switch (action.type) {
    case "SET_WORD_HUNT_INPUT":
      return { ...state, wordHuntInput: action.payload };
    case "SET_WORD_HUNT_TITLE":
      return { ...state, wordHuntTitle: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.payload };
    case "RESET":
      return { ...initialWordHuntState };
    default:
      return state;
  }
}

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
