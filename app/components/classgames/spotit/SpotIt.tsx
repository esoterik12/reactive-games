import * as React from "react";
import { useDispatch } from "react-redux";
import { resetWords, displayWords } from "@/app/redux/spotitSlice";
import classes from "./SpotIt.module.css";
import { SpotItInput } from "./SpotItInput";
import { useSelector } from "react-redux";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";

export function SpotIt() {
  const dispatch = useDispatch();
  const displayArray = useSelector((state: any) => state.spotIt.displayArray);
  const changed = useSelector((state: any) => state.spotIt.changed);

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

  function handleReset() {
    dispatch(resetWords());
  }

  function handleNext() {
    dispatch(displayWords());
  }

  const spotItSave = {
    save: {
      title: "placeholderSpotItTitle",
      output: displayArray,
      dataType: "spotIt",
    },
    outputComplete: changed,
  };

  return (
    <DefaultGameContainer
      resetFunction={handleReset}
      saveGameObject={spotItSave}
    >
      {!changed && (
        <div>
          <SpotItInput />
        </div>
      )}

      {changed && (
        <div className={classes.spotItOutput}>
          <div className={classes.buttonContainer}>
            <button onClick={handleNext}>Next</button>
          </div>
          <div className={classes.spotItContainer}>
            {displayArray.map((word: string, index: number) => (
              <div className={getRandomStyle()} key={index}>
                <p>{word}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </DefaultGameContainer>
  );
}
