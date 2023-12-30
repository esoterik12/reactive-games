// this function takes config options and returns an array of mines with ids, actions, sound fx, and more
// array depends on grid size selected by user
import { GridConfig } from "@/app/components/classgames/minefield/MinefieldInput";
import { MineData } from "@/app/components/classgames/minefield/Minefield";

export default function createMines(
  gridSize: string,
  gridConfig: GridConfig
): MineData[] {
  let minesArraySize: number;
  switch (gridSize) {
    case "small":
      minesArraySize = 20;
      break;
    case "medium":
      minesArraySize = 25;
      break;
    case "large":
      minesArraySize = 36;
      break;
    case "super":
      minesArraySize = 49;
      break;
    default:
      throw new Error("Invalid grid size.");
  }

  let minesArray: MineData[] = [];
  let counterId = 1; // used to generate ids - incremented each time a mine is added to minesArray
  const bombs = gridConfig.bombs;
  const switches = gridConfig.switches;
  const teams = gridConfig.teams;

  // creates bomb and switch mines according to gridCongfig input
  for (let i = 0; i < bombs; i++) {
    minesArray.push(
      createMine(counterId, "Boom!", "/assets/sounds/bombFx.mp3")
    );
    counterId++;
  }
  for (let i = 0; i < switches; i++) {
    minesArray.push(
      createMine(counterId, "Switch!", "/assets/sounds/switchFx.mp3")
    );
    counterId++;
  }

  // distributes the remaining spaces between +, -, x mines
  const remainingMines = minesArraySize - bombs - switches;
  const positives = Math.floor(remainingMines * 0.6);
  const negatives = Math.floor(remainingMines * 0.3);
  const multipliers = remainingMines - positives - negatives;

  // array of possible values for add / minus / multiply
  const possibleValues = [10, 10, 20, 20, 25, 25, 50, 50, 50, 75, 100, 150];
  const possibleMultiplierValues = [2, 2, 3, 3, 5];

  for (let i = 0; i < positives; i++) {
    const positiveQuantity = possibleValues[Math.floor(Math.random() * 12)];
    minesArray.push(
      createMine(counterId, "+", "/assets/sounds/addFx.mp3", positiveQuantity)
    );
    counterId++;
  }
  for (let i = 0; i < negatives; i++) {
    const negativeQuantity = possibleValues[Math.floor(Math.random() * 12)];
    minesArray.push(
      createMine(counterId, "-", "/assets/sounds/minusFx.mp3", negativeQuantity)
    );
    counterId++;
  }
  for (let i = 0; i < multipliers; i++) {
    const multipleQuantity =
      possibleMultiplierValues[Math.floor(Math.random() * 5)];
    minesArray.push(
      createMine(
        counterId,
        "x",
        "/assets/sounds/multiplyFx.mp3",
        multipleQuantity
      )
    );
    counterId++;
  }

  const shuffledMines = [...minesArray];
    for (let i = shuffledMines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMines[i], shuffledMines[j]] = [
        shuffledMines[j],
        shuffledMines[i],
      ];
    }

  console.log("shuffled minesArray in create-mines: ", shuffledMines);
  return shuffledMines;
}

// function to create object representing a mine for the minefield game
function createMine(
  id: number,
  action: string,
  audio: string,
  quantity?: number
): MineData {
  return {
    id,
    action,
    quantity,
    audio,
    turned: false,
  };
}
