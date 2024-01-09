import * as React from "react";
import { QuestionDataObject } from "./Jeopardy";
import classes from "./JeopardyOutput.module.css";
import { Question } from "./Jeopardy";

export interface IJeopardyOutputProps {
  jeopardyBoard: Question[][] | undefined;
  setJeopardyBoard: React.Dispatch<
    React.SetStateAction<Question[][] | undefined>
  >;
}

export function JeopardyOutput(props: IJeopardyOutputProps) {
  const [modal, setModal] = React.useState(false);
  const [pointsArray, setPointsArray] = React.useState<number[]>([0, 0, 0]);
  const [selectedTeams, setSelectedTeams] = React.useState<number[]>([]);
  const [activeQuestion, setActiveQuestion] = React.useState<number[]>([0, 0]);

  function handleClick(catIndex: number, objIndex: number) {
    if (props.jeopardyBoard) {
      const updatedArray = [...props.jeopardyBoard];

      updatedArray[catIndex][objIndex] = {
        ...updatedArray[catIndex][objIndex],
        turned: true,
      };

      props.setJeopardyBoard(updatedArray);
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
    if (props.jeopardyBoard) {
      const points = Math.floor(
        props.jeopardyBoard[activeQuestion[0]][activeQuestion[1]].points /
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
                <div
                  className={classes.indivTeamContainer}
                >
                  Team {index + 1}: <span className={classes.pointsText}>{team.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
      </div>
      <div className={classes.jeopardyGrid}>
        {props.jeopardyBoard &&
          props.jeopardyBoard.map((category, catIndex) => (
            <div className={classes.categoryColumn}>
              {/* Below gets the first word of the id to create a title */}
              <div className={classes.categoryTitle}>
                <h3>{category[0].id.match(/\b\w+\b/)}</h3>
              </div>

              {category.map((object, objIndex) => (
                <div
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
            {props.jeopardyBoard && (
              <>
                <h2>
                  {
                    props.jeopardyBoard[activeQuestion[0]][activeQuestion[1]]
                      .points
                  }
                </h2>
                <p>
                  {
                    props.jeopardyBoard[activeQuestion[0]][activeQuestion[1]]
                      .question
                  }
                </p>
                <div className={classes.pointsSelector}>
                  {pointsArray.map((team, index) => (
                    <button
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

