import * as React from "react";
import classes from "./MinefieldCard.module.css";
import calcMinesPoints from "@/utils/game-functions/calc-mines";
import { MineData } from "./Minefield";
// const audioSrc = '/assets/sounds/sweepFx.mp3';

export interface IMinefieldCardProps {
  index: number;
  number: number;
  minesData: any;
  setMinesData: any;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  points: number[];
  setPoints: React.Dispatch<React.SetStateAction<number[]>>;
}

export function MinefieldCard(props: IMinefieldCardProps) {
  const audioRef = React.useRef(new Audio(props.minesData[props.index].audio));
  const playAudio = () => {
    audioRef.current.play();
  };

  function handleClick() {
    playAudio();
    props.setMinesData((prevMinesData: MineData[]) => {
      // shallow copy
      const updatedMinesData = [...prevMinesData];

      // updates the specific element
      updatedMinesData[props.index] = {
        ...updatedMinesData[props.index],
        turned: true,
      };

      return updatedMinesData;
    });
    calcMinesPoints(
      props.turn,
      props.minesData[props.index],
      props.setPoints,
      props.points
    );

    props.setTurn((prevTurn: number) => {
      if (prevTurn === props.points.length - 1) {
        return 0;
      } else {
        return prevTurn + 1;
      }
    });
  }

  const isTurned = props.minesData[props.index].turned;

  return (
    <div className={classes.container}>
      <div className={`${classes.card} ${isTurned ? classes.flipped : ""}`}>
        {!isTurned && (
          <button className={classes.front} onClick={() => handleClick()}>
            <p>{props.index + 1}</p>
          </button>
        )}
        {isTurned && (
          <button disabled className={`${classes.back}`}>
            <p>{props.minesData[props.index].action}</p>
            <p>
              {props.minesData[props.index].quantity
                ? props.minesData[props.index].quantity
                : ""}
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
