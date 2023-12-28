import * as React from "react";
import classes from "./Memory.module.css";
import { DUMMY_WORDS_NUMBERS } from "./dummyWords";
import { MemoryCard } from "./MemoryCard";
import { MemoryInput } from "./MemoryInput";

export interface IMemoryProps {}

export interface wordsData {
  [key: number]: {
    word: string;
    number: number;
    visible: boolean;
    completed: boolean;
  };
}

export function Memory(props: IMemoryProps) {
  const [wordsData, setWordsData] =
    React.useState<wordsData>({}); // holds all game data
  const [visibleWords, setVisibleWords] = React.useState<any>([]); // holds the current words in play
  const [shuffledWords, setShuffledWords] = React.useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  // adds words to the visibleWords array
  function addVisible(key: number) {
    setVisibleWords((prevVisibleWords: []) => [
      ...prevVisibleWords,
      key,
    ]);
  }

  React.useEffect(() => {
    if (visibleWords && visibleWords.length > 1) {
      const timeout = setTimeout(() => {
        const [keyOne, keyTwo] = visibleWords
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
          // resets the property visible to false of selected words
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

  return (
    <div className={classes.pageContainer}>
      <h2>Play a Memory Game</h2>
      <MemoryInput
        setWordsData={setWordsData}
        setIsSubmitted={setIsSubmitted}
      />
      <p>
        This generator takes a sentence and outputs a cryptogram for players to
        decode.
      </p>
      {
        isSubmitted && <div className={classes.memoryContainer}>
        {shuffledWords.map((number, index) => (
          <div key={index}>
            <MemoryCard
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

      }
      
    </div>
  );
}
