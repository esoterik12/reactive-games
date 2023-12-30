import * as React from "react";
import classes from "./Minefield.module.css";
import { MinefieldCard } from "./MinefieldCard";
import { MinefieldInput } from "./MinefieldInput";

const initialPointsState = [0, 0];

export interface IMinefieldProps {}

export interface MineData {
  id: number;
  action: string;
  quantity?: number;
  turned: boolean;
  audio: string;
}

export function Minefield(props: IMinefieldProps) {
  const [minesData, setMinesData] = React.useState<MineData[]>([]);
  const [points, setPoints] = React.useState<number[]>(initialPointsState);
  const [turn, setTurn] = React.useState(0);

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

  function handleReset() {
    setTurn(0)
    setMinesData([])
  }

  return (
    <div className={classes.pageContainer}>
      {minesData.length === 0 && (
        <MinefieldInput setMinesData={setMinesData} setPoints={setPoints} />
      )}

      {minesData.length !== 0 && (
        <>
          <div className={classes.pointsContainer}>
            {points.map((team, index) => (
              <div key={index} className={classes.teamsContainer}>
                <div
                  className={`${classes.indivTeamContainer} ${
                    index === turn ? classes.activeTeam : ""
                  }`}
                >
                  Team {index + 1}: {team}
                </div>
              </div>
            ))}
          </div>
          <div className={`${classes.minefieldContainer} ${gridStyles}`}>
            {Array.isArray(minesData) &&
              minesData.map((mine, index) => (
                <MinefieldCard
                  key={`${mine.id}`}
                  index={index}
                  number={mine.id}
                  minesData={minesData}
                  setMinesData={setMinesData}
                  turn={turn}
                  setTurn={setTurn}
                  points={points}
                  setPoints={setPoints}
                />
              ))}
          </div>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}
