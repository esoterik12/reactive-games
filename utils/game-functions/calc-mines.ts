export default function calcMinesPoints(
  turn: number,
  mineData: any,
  setPoints: any,
  points: number[]
) {
  console.log("calcMines turn: ", turn);
  console.log("calcMines minesData: ", mineData);
  const numOfTeams = points.length;

  if (mineData.action === "Switch!") {
    setPoints((prevPoints: number[]) => {
      const newPoints = [...prevPoints]; // Create a copy of the array
      const temp = newPoints[turn]; // Store the value at prevPoints[turn]

      const switchTeam = randomOtherTeam(turn, numOfTeams)

      newPoints[turn] = newPoints[switchTeam]; // Swap the values
      newPoints[switchTeam] = temp;
      return newPoints; // Return the updated array
    });
  } else {
    setPoints((prevPoints: number[]) => {
      return prevPoints.map((value, index) => {
        if (index === turn) {
          if (mineData.action === "+") {
            return value + mineData.quantity;
          }
          if (mineData.action === "-") {
            return value - mineData.quantity;
          }
          if (mineData.action === "x") {
            return value * mineData.quantity;
          }
          if (mineData.action === "Boom!") {
            return 0;
          }
          
          return value + 0;
        }
        return value;
      });
    });
  }
}

function randomOtherTeam(turn: number, numOfTeams: number) {
  const otherTeam = Math.floor(Math.random() * numOfTeams);

  if (otherTeam === turn) {
    return randomOtherTeam(turn, numOfTeams);
  } else {
    return otherTeam;
  }
}
