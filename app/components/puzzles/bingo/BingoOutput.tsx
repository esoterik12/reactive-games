import * as React from "react";
import classes from "./BingoOutput.module.css";

export interface IBingoOutputProps {
  bingoOutput: any;
  printRef: React.RefObject<HTMLDivElement>;
}

export function BingoOutput(props: IBingoOutputProps) {
  return (
    <div className={classes.bingoOutputContainer}>
      <h2>Your Bingo Cards:</h2>
      <div ref={props.printRef} className={classes.bingoOutputContainer}>
        {props.bingoOutput.bingoArray.map((array: [], index: number) => (
          <div className={classes.cardContainer} key={index}>
            <h3 className={classes.title}>Card #{index + 1}</h3>
            <div className={classes.gridContainer}>
              {array.map((word, subIndex) => (
                <div key={`${index}${subIndex}`} className={classes.item}>
                  <p>{word}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
