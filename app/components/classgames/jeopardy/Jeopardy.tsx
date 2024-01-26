import * as React from "react";
import { DUMMY_REQUEST } from "./dummyContent";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import classes from "./Jeopardy.module.css";
import { JeopardyOutput } from "./JeopardyOutput";
import { DefaultLoader } from "../../common/thirdparty";
import { JeopardyInput } from "./JeopardyInput";

export interface jeopardyRequest {
  levelDescription: string;
  vocabularyContent: string;
  grammarContent: string;
  phonicsContent: string;
  themeContent: string;
}

export interface QuestionDataObject {
  categories: [
    {
      category: string;
      questions: [
        {
          question: string;
          answer: string;
        }
      ];
    }
  ];
}

export interface Question {
  id: string;
  question: string;
  turned: boolean;
  points: number;
}

export interface IJeopardyProps {}

export function Jeopardy(props: IJeopardyProps) {
  const [questionData, setQuestionData] = React.useState<
    QuestionDataObject | undefined
  >(); // Object to hold GPT generated questions
  const [jeopardyBoard, setJeopardyBoard] = React.useState<Question[][]>(); // Array with added data for the game board
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generators/jeopardy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DUMMY_REQUEST),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error with response in fetch request: ", errorData);
        dispatch(setMessage("Error - please try again."));
        dispatch(toggleModal());
        setIsLoading(false);
      }

      if (response.ok) {
        const responseData = await response.json();
        const responseObject = JSON.parse(responseData);
        setQuestionData(responseObject);
        setIsLoading(false);
      }
    } catch (error: any) {
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
      console.log("Error in handleGenerate in Jeopardy.tsx: ", error);
      setIsLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formDataArray: any[] = [];
    let subArray: any[] = []; // Creates empty subArray for the first category
    let points = 100;

    for (const [key, value] of formData.entries()) {
      subArray.push({
        id: key,
        question: value,
        turned: false,
        points: points,
      });
      points += 100;
      if (subArray.length === 6) {
        formDataArray.push(subArray);
        subArray = [];
        points = 100;
      }
    }

    console.log(formDataArray);

    setJeopardyBoard(formDataArray);
  }

  if (isLoading) {
    return (
      <div className={classes.jeopardyPageContainer}>
        <div className={classes.loadingSpinnerContainer}>
          <DefaultLoader />
          <p>Generating your questions...</p>
          <p>This process usually takes about 20 to 30 seconds.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.jeopardyPageContainer}>
      <div>
        {/* Placeholder generating questions from DUMMY_REQUEST */}
        {!questionData && <JeopardyInput setQuestionData={setQuestionData} />}
      </div>
      {questionData && !jeopardyBoard && (
        <div className={classes.jeopardyPreviewContainer}>
          <h2>Play a Memory Game</h2>
          <p>
            Generated questions usually need improvement; edit or change them
            completely.
          </p>
          {/* // There should be only 4 categories array element (always
          questionData.categories[0] - [3]) // For each categoires, there should
          be questions[0] - [5] // The object should also generate answers for
          each question (eg questions[0].answer) // See TS interface above */}
          <form className={classes.jeopardyForm} onSubmit={handleSubmit}>
            {questionData.categories.map((category) => (
              <div>
                <h3>{category.category}</h3>
                {category.questions.map((question, index) => (
                  <div>
                    <label
                      htmlFor={`${category.category} - ${(index + 1) * 100}`}
                    >
                      {(index + 1) * 100}
                    </label>
                    <input
                      defaultValue={question.question}
                      type="text"
                      name={`${category.category} - ${(index + 1) * 100}`}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Confirm</button>
          </form>
        </div>
      )}

      {jeopardyBoard && (
        <JeopardyOutput
          jeopardyBoard={jeopardyBoard}
          setJeopardyBoard={setJeopardyBoard}
        />
      )}
    </div>
  );
}
