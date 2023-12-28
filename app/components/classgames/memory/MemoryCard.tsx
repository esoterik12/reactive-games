import * as React from "react";
import classes from "./MemoryCard.module.css";
import { wordsData } from "./Memory";

export interface IMemoryCardProps {
  number: string; // will be parsedInt
  setWordsData: any;
  addVisible: any;
  wordsData: wordsData;
  visibleWords: string[];
  shuffledWords: string[]
}

export function MemoryCard(props: IMemoryCardProps) {
  const numberKey = parseInt(props.number)

  function handleClick() {
    // stops clicks while evaluating two cards
    if (props.visibleWords.length > 1) {
      return;
    }
    // if (!(props.word in props.wordsData)) {
    //   console.log("Word not found in wordsData: ", props.word);
    //   return;
    // }
    // if (props.visibleWords.includes(props.word)) {
    //   console.log("Word is already visible: ", props.word);
    //   return;
    // }
    props.addVisible(numberKey);
    props.setWordsData((prevWordsData: wordsData) => ({
      ...prevWordsData,
      [numberKey]: {
        ...prevWordsData[numberKey],
        visible: true,
      },
    }));
  }

  const isCompleted = props.wordsData[numberKey].completed;
  const isFlipped = props.wordsData[numberKey].visible;

  let backStyles;
  if (isCompleted) {
    backStyles = classes.backCompleted;
  } else {
    backStyles = classes.backIncomplete;
  }


  return (
    <div className={classes.container}>
      <div className={`${classes.card} ${isFlipped ? classes.flipped : ""}`}>
        {!isFlipped && !isCompleted && (
          <button onClick={() => handleClick()} className={classes.front}>
            <p>click</p>
          </button>
        )}
        {(isFlipped || isCompleted) && (
          <button
            disabled
            className={`${classes.back} ${backStyles}`}
          >
              <p>{props.wordsData[numberKey].word}</p>
          </button>
        )}
      </div>
    </div>
  );
}
