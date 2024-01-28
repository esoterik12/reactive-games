import * as React from "react";
import classes from "./Memory.module.css";
import { MemoryCard } from "./MemoryCard";
import { MemoryInput } from "./MemoryInput";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";

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
  const [visibleWords, setVisibleWords] = React.useState<any>([]); // holds the current words in play
  const [shuffledWords, setShuffledWords] = React.useState<string[] | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  // adds words to the visibleWords array
  function addVisible(key: number) {
    setVisibleWords((prevVisibleWords: []) => [...prevVisibleWords, key]);
  }

  React.useEffect(() => {
    if (visibleWords && visibleWords.length > 1) {
      const timeout = setTimeout(() => {
        const [keyOne, keyTwo] = visibleWords;
        if (wordsData[keyOne].number === wordsData[keyTwo].number) {
          setWordsData((prevWordsData) => ({
            ...prevWordsData,
            [keyOne]: {
              ...wordsData[keyOne],
              completed: true,
            },
            [keyTwo]: {
              ...wordsData[keyTwo],
              completed: true,
            },
          }));
          setVisibleWords([]);
        } else {
          // resets the property of selected words "visible" to false
          setWordsData((prevWordsData) => ({
            ...prevWordsData,
            [keyOne]: {
              ...wordsData[keyOne],
              visible: false,
              completed: false,
            },
            [keyTwo]: {
              ...wordsData[keyTwo],
              visible: false,
              completed: false,
            },
          }));
          setVisibleWords([]);
        }
        // clears the currently visible words array
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords]);

  React.useEffect(() => {
    const numberArray = Object.keys(wordsData);
    const shuffledArray = [...numberArray];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (1 + i));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setShuffledWords(shuffledArray);
    console.log("Shuffled words: ", shuffledWords);
  }, [isSubmitted]);

  function handleReset() {
    setIsSubmitted(false);
    setWordsData({});
  }

  const memorySave = {
    save: {
      title: "",
      output: shuffledWords,
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
        <>
          <div className={classes.buttonContainer}>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div className={classes.memoryContainer}>
            {shuffledWords?.map((number, index) => (
              <div key={index}>
                <MemoryCard
                  index={index}
                  number={number}
                  addVisible={addVisible}
                  visibleWords={visibleWords}
                  setWordsData={setWordsData}
                  wordsData={wordsData}
                  shuffledWords={shuffledWords}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </DefaultGameContainer>
  );
}
