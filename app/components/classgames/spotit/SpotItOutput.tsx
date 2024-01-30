import * as React from "react";
import classes from "./SpotItOutput.module.css";
import { useDispatch } from "react-redux";
import { displayWords } from "@/app/redux/spotitSlice";

export interface ISpotItOutputProps {
  displayArray: any;
}

export function SpotItOutput(props: ISpotItOutputProps) {
  const dispatch = useDispatch();

  function getRandomStyle() {
    const randomStyles = [
      classes.wordCenter,
      classes.wordTopLeft,
      classes.wordBotRight,
      classes.wordTopRight,
      classes.wordBotLeft,
    ];
    const randStylesIndex = Math.floor(Math.random() * 5);
    return randomStyles[randStylesIndex];
  }

  function handleNext() {
    dispatch(displayWords());
  }

  return (
    <div className={classes.spotItOutput}>
      <div className={classes.buttonContainer}>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className={classes.spotItContainer}>
        {props.displayArray.map((word: string, index: number) => (
          <div className={getRandomStyle()} key={index}>
            <p>{word}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
