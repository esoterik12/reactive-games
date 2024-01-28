// This default container handles all major saving and pdf creation functions
// It is designed for consistent styling and easy maintenance of activity creators
// Takes print refs from parent of each activity page for handleGeneratePDF
// Take a saveObject from parent to use in SaveButton for PostgreSQL db
// saved state interacts with save button for styling

import * as React from "react";
import classes from "./DefaultContainer.module.css";
import { SaveButton } from "../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";

export type SaveObject = {
  save: {
    title: string | null;
    output: [] | {} | null;
    dataType: string;
  };
  outputComplete: boolean; // Used to control output button visibility
  pdfTitle: string
}

export interface IDefaultContainerProps {
  printRef: React.RefObject<HTMLDivElement>;
  resetFunction: () => void;
  saveObject: SaveObject
  children: React.ReactNode;
}

export function DefaultContainer(props: IDefaultContainerProps) {
  const [saved, setSaved] = React.useState(false);

  function handleGeneratePDF() {
    generatePDF(props.printRef.current, props.saveObject.pdfTitle);
  }

  return (
    <div className={classes.defaultContainer}>
      {props.saveObject.outputComplete && (
        <div className={classes.outputButtonsContainer}>
          <SaveButton
            saveObject={props.saveObject}
            saved={saved}
            setSaved={setSaved}
          />
          <button onClick={handleGeneratePDF}>Download PDF</button>
          <button onClick={() => props.resetFunction()}>Reset</button>
        </div>
      )}
      {props.children}
    </div>
  );
}
