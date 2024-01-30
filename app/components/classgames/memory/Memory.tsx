import * as React from "react";
import classes from "./Memory.module.css";
import { MemoryCard } from "./MemoryCard";
import { MemoryInput } from "./MemoryInput";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";
import { MemoryOutput } from "./MemoryOutput";

export interface wordsData {
  [key: number]: {
    word: string;
    number: number;
    visible: boolean;
    completed: boolean;
  };
}

export function Memory() {
  const [wordsData, setWordsData] = React.useState<wordsData>({}); // holds all game data
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  
  function handleReset() {
    setIsSubmitted(false);
    setWordsData({});
  }

  const memorySave = {
    save: {
      title: "defaultMemoryTitle",
      output: wordsData,
      dataType: "memory",
    },
    outputComplete: isSubmitted,
  };

  return (
    <DefaultGameContainer
      resetFunction={handleReset}
      saveGameObject={memorySave}
    >
      <h2>Play a Memory Game</h2>
      <p>Input eight pairs of words to create a 4x4 memory grid.</p>
      {!isSubmitted && (
        <MemoryInput
          setWordsData={setWordsData}
          setIsSubmitted={setIsSubmitted}
        />
      )}

      {isSubmitted && (
        <MemoryOutput wordsData={wordsData} isSubmitted={isSubmitted} />
      )}
    </DefaultGameContainer>
  );
}
