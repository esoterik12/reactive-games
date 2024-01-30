import * as React from "react";
import classes from "./JeopardyOutput.module.css";
import { Question } from "./Jeopardy";

export interface IJeopardyOutputProps {
  jeopardyBoard: Question[][] | undefined;
} 

export function JeopardyOutput(props: IJeopardyOutputProps) {
  const [modal, setModal] = React.useState(false);
  const [loadedJeopardyBoard, setLoadedJeopardyBoard] = React.useState<Question[][]>()
  const [pointsArray, setPointsArray] = React.useState<number[]>([0, 0, 0]);
  const [selectedTeams, setSelectedTeams] = React.useState<number[]>([]);
  const [activeQuestion, setActiveQuestion] = React.useState<number[]>([0, 0]);

  React.useEffect(() => {
    setLoadedJeopardyBoard(props.jeopardyBoard)
  }, [props.jeopardyBoard])

  function handleClick(catIndex: number, objIndex: number) {
    if (loadedJeopardyBoard) {
      setModal(true);
      setActiveQuestion([catIndex, objIndex]);
    }
  }

  function closeModal() {
    setModal(false);
    setSelectedTeams([]);
  }

  function handleTeamSelect(index: number) {
    if (!selectedTeams.includes(index)) {
      setSelectedTeams((prevSelectedTeams) => {
        const newSelectedTeams = [...prevSelectedTeams];
        newSelectedTeams.push(index);
        return newSelectedTeams;
      });
    } else {
      setSelectedTeams((prevSelectedTeams) => {
        const newSelectedTeams = [...prevSelectedTeams];
        const returnArray = newSelectedTeams.filter((team) => team !== index);
        return returnArray;
      });
    }
  }

  // This function updates the pointsArray depending on the points of the activeQuestion
  // as well as the selectedTeams state in the question modal
  function handleContinue() {
    if (loadedJeopardyBoard) {
      const updatedArray = loadedJeopardyBoard.map(category => 
        category.map(question => ({ ...question }))
      );
      
      updatedArray[activeQuestion[0]][activeQuestion[1]].turned = true;

      setLoadedJeopardyBoard(updatedArray);

      const points = Math.floor(
        loadedJeopardyBoard[activeQuestion[0]][activeQuestion[1]].points /
          selectedTeams.length
      );

      setPointsArray((prevPointsArray) => {
        const newPointsArray = [...prevPointsArray];

        selectedTeams.forEach((index) => {
          newPointsArray[index] += points;
        });
        return newPointsArray;
      });
    }

    setModal(false);
    setSelectedTeams([]);
  }

  return (
    <div>
      <div className={classes.scoreContainer}>
        <div className={classes.pointsContainer}>
          {pointsArray.map((team, index) => (
            <div key={index} className={classes.teamsContainer}>
              <div className={classes.indivTeamContainer}>
                Team {index + 1}:{" "}
                <span className={classes.pointsText}>
                  {team.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.jeopardyGrid}>
        {loadedJeopardyBoard &&
          loadedJeopardyBoard.map((category, catIndex) => (
            <div key={catIndex} className={classes.categoryColumn}>
              {/* Below gets the first word of the id to create a title */}
              <div className={classes.categoryTitle}>
                <h3>{category[0].id.match(/\b\w+\b/)}</h3>
              </div>

              {category.map((object, objIndex) => (
                <div
                  key={objIndex}
                  className={`${classes.cardContainer} ${
                    object.turned ? classes.flipped : ""
                  }`}
                >
                  <button
                    disabled={object.turned}
                    onClick={() => handleClick(catIndex, objIndex)}
                  >
                    <p>{(objIndex + 1) * 100}</p>{" "}
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
      {modal && (
        <div className={classes.jeopardyModal}>
          <div className={classes.modalQuestion}>
            {loadedJeopardyBoard && (
              <>
                <h2>
                  {
                    loadedJeopardyBoard[activeQuestion[0]][activeQuestion[1]]
                      .points
                  }
                </h2>
                <p>
                  {
                    loadedJeopardyBoard[activeQuestion[0]][activeQuestion[1]]
                      .question
                  }
                </p>
                <div className={classes.pointsSelector}>
                  {pointsArray.map((team, index) => (
                    <button
                    key={index}
                    className={`${
                        selectedTeams.includes(index)
                          ? classes.selectedTeam
                          : ""
                      }`}
                      onClick={() => handleTeamSelect(index)}
                    >
                      Team {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className={classes.buttonContainer}>
              <button onClick={handleContinue}>Continue</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
