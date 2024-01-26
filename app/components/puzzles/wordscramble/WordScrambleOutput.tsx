import * as React from "react";
import classes from "./WordScrambleOutput.module.css";
import { useRef } from "react";
import jsPDF from "jspdf";

export interface IWordScrambleOutputProps {
  scrambleTitle: string;
  scrambleOutput: any;
  printRef: React.RefObject<HTMLDivElement>
}

export function WordScrambleOutput(props: IWordScrambleOutputProps) {
    return (
    <div className={classes.scrambleContainer}>
      <div ref={props.printRef} className={classes.pdfContainer}>
        <h2>{props.scrambleTitle}</h2>
        <h4>Name: _____________</h4>
        <div className={classes.scrambleOutputContainer}>
          {props.scrambleOutput.map((word: string, index: number) => (
            <div className={classes.cardContainer} key={index}>
              <p>{word}</p>
              <p>_____________</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
