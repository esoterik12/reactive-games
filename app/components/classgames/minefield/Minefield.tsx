import * as React from "react";
import classes from "./Minefield.module.css";
import { DUMMY_MINES } from "./dummyMineInput";
import { MinefieldCard } from "./MinefieldCard";

const initialPointsState = [0, 0];

export interface IMinefieldProps {}

export interface MineData {
  id: number;
  action: string;
  quantity?: number;
  turned: boolean;
  audio:string;
}

export function Minefield(props: IMinefieldProps) {
  const [minesData, setMinesData] = React.useState<MineData[]>([]);
  const [points, setPoints] = React.useState<number[]>(initialPointsState);
  const [turn, setTurn] = React.useState(0);

  React.useEffect(() => {
    const shuffledMines = [...DUMMY_MINES];
    for (let i = shuffledMines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMines[i], shuffledMines[j]] = [
        shuffledMines[j],
        shuffledMines[i],
      ];
    }
    setMinesData(shuffledMines);
  }, []);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.pointsContainer}>
        {points.map((team, index) => (
          <div key={index} className={classes.teamsContainer}>
            <div className={`${index === turn ? classes.activeTeam : ""}`}>
              Team {index + 1}: {team}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.minefieldContainer}>
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
    </div>
  );
}
