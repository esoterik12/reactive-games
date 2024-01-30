// This default container handles all major game pages
// It is designed for consistent styling and easy maintenance of activity creators
// Take a saveObject from parent to use in SaveButton for PostgreSQL db
// saved state interacts with save button for styling
// Separate container made from paper activities given different requirements and to allow easier development

import * as React from "react";
import classes from "./DefaultGameContainer.module.css";
import { SaveButton } from "../input/SaveButton";
import { Question } from "../../classgames/jeopardy/Jeopardy";

// This includes save property as optional so the container can be used for games that do not need a save
export type SaveGameObject = {
  save?: {
    title: string | null;
    output: [] | {} | Question[][] | null | undefined;
    dataType: string;
  };
  outputComplete: boolean; // Used to control output component visibility
};

export interface IDefaultContainerProps {
  resetFunction: () => void;
  saveGameObject: SaveGameObject;
  children: React.ReactNode;
}

export function DefaultGameContainer(props: IDefaultContainerProps) {
  const [saved, setSaved] = React.useState(false);

  function containerReset() {
    props.resetFunction()
    setSaved(false)
  }

  return (
    <div className={classes.defaultContainer}>
      {props.saveGameObject?.outputComplete && (
        <div className={classes.outputButtonsContainer}>
          {props.saveGameObject?.save && (
            <SaveButton
              saveObject={props.saveGameObject}
              saved={saved}
              setSaved={setSaved}
            />
          )}
          <button onClick={containerReset}>Reset</button>
        </div>
      )}
      {props.children}
    </div>
  );
}
