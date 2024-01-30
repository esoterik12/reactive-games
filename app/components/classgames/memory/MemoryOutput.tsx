import * as React from "react";
import { wordsData } from "./Memory";
import classes from "./MemoryOutput.module.css";
import { MemoryCard } from "./MemoryCard";

export interface IMemoryOutputProps {
  wordsData: wordsData;
  isSubmitted: boolean;
}

export function MemoryOutput(props: IMemoryOutputProps) {
  const [loadedWordsData, setLoadedWordsData] = React.useState<wordsData>({}); // holds all game data
  const [visibleWords, setVisibleWords] = React.useState<any>([]); // holds the current words in play
  const [shuffledWords, setShuffledWords] = React.useState<string[] | null>(
    null
  );

  React.useEffect(() => {
    setLoadedWordsData(props.wordsData);
    if (props.wordsData) {
      const numberArray = Object.keys(props.wordsData);
      const shuffledArray = [...numberArray];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (1 + i));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      setShuffledWords(shuffledArray);
    }
  }, [props.wordsData]);

  React.useEffect(() => {
    if (visibleWords && visibleWords.length > 1) {
      const timeout = setTimeout(() => {
        const [keyOne, keyTwo] = visibleWords;
        if (loadedWordsData[keyOne].number === loadedWordsData[keyTwo].number) {
          setLoadedWordsData((prevWordsData) => ({
            ...prevWordsData,
            [keyOne]: {
              ...loadedWordsData[keyOne],
              completed: true,
            },
            [keyTwo]: {
              ...loadedWordsData[keyTwo],
              completed: true,
            },
          }));
          setVisibleWords([]);
        } else {
          // resets the property of selected words "visible" to false
          setLoadedWordsData((prevWordsData) => ({
            ...prevWordsData,
            [keyOne]: {
              ...loadedWordsData[keyOne],
              visible: false,
              completed: false,
            },
            [keyTwo]: {
              ...loadedWordsData[keyTwo],
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

  function addVisible(key: number) {
    setVisibleWords((prevVisibleWords: []) => [...prevVisibleWords, key]);
  }

  return (
    <div className={classes.memoryContainer}>
      {shuffledWords?.map((number, index) => (
        <div key={index}>
          <MemoryCard
            index={index}
            number={number}
            addVisible={addVisible}
            visibleWords={visibleWords}
            setLoadedWordsData={setLoadedWordsData}
            wordsData={loadedWordsData}
            shuffledWords={shuffledWords}
          />
        </div>
      ))}
    </div>
  );
}
