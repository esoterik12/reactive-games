import * as React from "react";
import { MinefieldInput } from "./MinefieldInput";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";
import { MinefieldOutput } from "./MinefieldOutput";

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

  function handleReset() {
    setTurn(0);
    setMinesData([]);
  }

  const minefieldSave = {
    save: {
      title: "placeholderMinesTitle",
      output: { minesData, turn },
      dataType: "minefield",
    },
    outputComplete: !!(minesData.length > 0),
  };

  return (
    <DefaultGameContainer
      resetFunction={handleReset}
      saveGameObject={minefieldSave}
    >
      {minesData.length === 0 && (
        <MinefieldInput setMinesData={setMinesData} setPoints={setPoints} />
      )}

      <MinefieldOutput 
          minesData={minesData}
          setMinesData={setMinesData}
          turn={turn}
          setTurn={setTurn}
          points={points}
          setPoints={setPoints}
      />
    </DefaultGameContainer>
  );
}
