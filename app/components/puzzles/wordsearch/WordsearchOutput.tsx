import * as React from "react";
import classes from "./WordsearchOutput.module.css";
import { useRef } from "react";
import generatePDF from "@/utils/pdf/generatePDF";

export interface IWordsearchOutputProps {
  wordsearchOutput: any[];
  wordsearchTitle: string;
  wordsearchInput: string;
}

export function WordsearchOutput(props: IWordsearchOutputProps) {
  const wordsearchRef = useRef<any>(null);

  async function handleGeneratePDF() {
    await generatePDF(wordsearchRef.current, "wordSearchoutput");
  }

  return (
    <>
      <h2>Preview your Wordsearch:</h2>
      <div className={classes.outputButtonsContainer}>
        <button onClick={handleGeneratePDF}>Download PDF</button>
      </div>
      <div ref={wordsearchRef} className={classes.pdfContainer}>
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
