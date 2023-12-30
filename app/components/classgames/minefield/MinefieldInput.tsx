import * as React from "react";
import classes from "./MinefieldInput.module.css";
import createMines from "@/utils/game-functions/create-mines";
import { MineData } from "./Minefield";

export interface IMinefieldInputProps {
  setMinesData: React.Dispatch<React.SetStateAction<MineData[]>>;
  setPoints: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface GridConfig {
  teams: number;
  bombs: number;
  switches: number;
}

export function MinefieldInput(props: IMinefieldInputProps) {
  const [gridSelected, setGridSelected] = React.useState("medium");
  const [gridConfig, setGridConfig] = React.useState<GridConfig>({
    teams: 2,
    bombs: 1,
    switches: 1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const newValue = type === "number" ? Number(value) : value;

    // limiting input options
    if (typeof newValue === "number" && (newValue > 5 || newValue < 1)) {
      return;
    }

    setGridConfig((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    props.setMinesData(createMines(gridSelected, gridConfig)); // uses createMines func to generate mines {}[]
    props.setPoints(new Array(gridConfig.teams).fill(0)); // creates array with a zero for each team
  };

  return (
    <div className={classes.minesInputContianer}>
      <h2>Customize the Minefield</h2>
      <p>Choose the grid size:</p>
      <div className={classes.gridSize}>
        <button
          className={gridSelected === "small" ? classes.buttonSelected : ""}
          onClick={() => setGridSelected("small")}
        >
          Small: 4x5
        </button>
        <button
          className={gridSelected === "medium" ? classes.buttonSelected : ""}
          onClick={() => setGridSelected("medium")}
        >
          Medium: 5x5
        </button>
        <button
          className={gridSelected === "large" ? classes.buttonSelected : ""}
          onClick={() => setGridSelected("large")}
        >
          Large: 6x6
        </button>
        <button
          className={gridSelected === "super" ? classes.buttonSelected : ""}
          onClick={() => setGridSelected("super")}
        >
          Super: 7x7
        </button>
      </div>
      <MinefieldInputField
        type="number"
        name="teams"
        label="Choose 2-5 teams."
        value={gridConfig.teams}
        onChange={handleChange}
      />
      <MinefieldInputField
        type="number"
        name="bombs"
        label="How many bombs would you like on the board?"
        value={gridConfig.bombs}
        onChange={handleChange}
      />
      <MinefieldInputField
        type="number"
        name="switches"
        label="How many point switches on the board?"
        value={gridConfig.switches}
        onChange={handleChange}
      />
      <div className={classes.buttonContainer}>
        <button onClick={handleSubmit}>Create Minefield!</button>
      </div>
    </div>
  );
}

interface IMinefieldInputFieldProps {
  type: string;
  name: string;
  label: string;
  value: any;
  onChange: any;
}

function MinefieldInputField(props: IMinefieldInputFieldProps) {
  const { type, name, label, value, onChange } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
