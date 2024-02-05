import * as React from "react";
import { MineData } from "./Minefield";
import classes from "./MinefieldOutput.module.css";
import { MinefieldCard } from "./MinefieldCard";

export interface IMinefieldOutputProps {
  minesData: MineData[];
  setMinesData: React.Dispatch<React.SetStateAction<MineData[]>>;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  points: number[];
  setPoints: React.Dispatch<React.SetStateAction<number[]>>;
}

export function MinefieldOutput(props: IMinefieldOutputProps) {
  const { minesData, setMinesData, turn, setTurn, points, setPoints } = props;
  const [displayTurn, setDisplayTurn] = React.useState(turn);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayTurn(turn);
    },800);

    return () => clearTimeout(timer); 
  }, [turn]); 

  // conditional grid size styling:
  let gridStyles;
  if (minesData.length === 20) {
    gridStyles = classes.smallGrid;
  } else if (minesData.length === 25) {
    gridStyles = classes.mediumGrid;
  } else if (minesData.length === 36) {
    gridStyles = classes.largeGrid;
  } else {
    gridStyles = classes.superGrid;
  }

  return (
    <>
      {minesData.length !== 0 && (
        <>
          <div className={classes.pointsContainer}>
            {points.map((team, index) => (
              <div key={index} className={classes.teamsContainer}>
                <div
                  className={`${classes.indivTeamContainer} ${
                    index === displayTurn ? classes.activeTeam : ""
                  }`}
                >
                  Team {index + 1}: {team}
                </div>
              </div>
            ))}
          </div>
          <div className={`${classes.minefieldContainer} ${gridStyles}`}>
            {Array.isArray(props.minesData) &&
              minesData.map((mine, index) => (
                <MinefieldCard
                  key={`${mine.id}`}
                  index={index}
                  number={mine.id}
                  minesData={props.minesData}
                  setMinesData={setMinesData}
                  turn={turn}
                  setTurn={setTurn}
                  points={points}
                  setPoints={setPoints}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}
