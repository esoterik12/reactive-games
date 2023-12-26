import * as React from "react";
import classes from "./MemoryCard.module.css";
import { wordsData } from "./Memory";

export interface IMemoryCardProps {
  word: string;
  setWordsData: any;
  addVisible: any;
  wordsData: wordsData;
  visibleWords: string[];
}

export function MemoryCard(props: IMemoryCardProps) {
  function handleClick() {
    // stops clicks while evaluating two cards
    if (props.visibleWords.length > 1) {
      return;
    }
    if (!(props.word in props.wordsData)) {
      console.log("Word not found in wordsData: ", props.word);
      return;
    }
    if (props.visibleWords.includes(props.word)) {
      console.log("Word is already visible: ", props.word);
      return;
    }
    console.log("Handling MemoryCard click: ", props.word);
    props.addVisible(props.word);
    props.setWordsData((prevWordsData: wordsData) => ({
      ...prevWordsData,
      [props.word]: {
        ...prevWordsData[props.word],
        visible: true,
      },
    }));
  }

  const isCompleted = props.wordsData[props.word].completed;
  const isFlipped = props.wordsData[props.word].visible;

  React.useEffect(() => {}, []);

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
            <p>CLICK</p>
          </button>
        )}
        {(isFlipped || isCompleted) && (
          <button
            disabled
            className={`${classes.back} ${backStyles}`}
          >
              <p>{props.word}</p>
          </button>
        )}
      </div>
    </div>
  );
}
