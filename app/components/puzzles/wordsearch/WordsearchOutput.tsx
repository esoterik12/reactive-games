import * as React from "react";
import classes from "./WordsearchOutput.module.css";

export interface IWordsearchOutputProps {
  wordsearchOutput: any[];
  wordsearchTitle: string;
  wordsearchInput: string;
  printRef: React.RefObject<HTMLDivElement>
}

export function WordsearchOutput(props: IWordsearchOutputProps) {
  return (
    <>
      <h2>Your Wordsearch:</h2>
      <div ref={props.printRef} className={classes.pdfContainer}>
        {props.wordsearchOutput.map((versionArray, verIndex) => (
          <div className={classes.individualContainer} key={`ver-${verIndex}`}>
            <h3>
              {props.wordsearchTitle} - #{verIndex + 1}
            </h3>
            {versionArray.map((outerArray: [], outIndx: number) => (
              <div key={`row-${outIndx}`} className={classes.letterRow}>
                {outerArray.map((letter: string, inIndx: number) => (
                  <p key={`row-${outIndx}-col-${inIndx}`}>{letter}</p>
                ))}
              </div>
            ))}
            <div className={classes.wordsToFind}>
              {props.wordsearchInput
                .split(",")
                .map((ele) => ele.trim())
                .map((word) => (
                  <p>{word}</p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
