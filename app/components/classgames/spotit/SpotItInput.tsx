import * as React from "react";
import classes from "./SpotItInput.module.css";
import { GenInputField } from "../../input/GenInputField";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import { setWords, resetWords, displayWords } from "@/app/redux/spotitSlice";
import {
  validateSpotIt,
  validateSpotItReq,
} from "@/utils/validation/validateSpotIt";
import { DefaultLoader } from "../../common/thirdparty";

export function SpotItInput() {
  const dispatch = useDispatch();
  const [spotItInput, setSpotItInput] = React.useState<string>("");
  const [spotItRequest, setSpotItRequest] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    try {
      validateSpotItReq(spotItRequest);
      const response = await fetch("/api/generators/spot-it", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spotItRequest,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(
          "Error with response in fetch request in tsx file: ",
          errorData
        );
        dispatch(setMessage("Error - please try again."));
        dispatch(toggleModal());
        setIsLoading(false);
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success with api request: ", responseData);
        dispatch(setWords(responseData));
        dispatch(displayWords());
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error from catch: ", error);
      dispatch(setMessage("Error - please try again."));
      dispatch(toggleModal());
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    if (spotItInput?.trim() !== "" || spotItInput !== undefined) {
      const wordsArray = spotItInput?.split(",");
      try {
        validateSpotIt(wordsArray);
        dispatch(setWords(wordsArray));
        dispatch(displayWords());
      } catch (error: any) {
        console.log("Error from handleSubmit: ", error);
        dispatch(setMessage(`${error}`));
        dispatch(toggleModal());
      }
    }
  }

  function handleReset() {
    dispatch(resetWords());
  }

  let wordCount: number | undefined = 0;
  if (spotItInput) {
    wordCount = (spotItInput
      ?.split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0)).length;
  }

  return (
    <div className={classes.spotItInputContainer}>
      <h2>Spot It</h2>
      <p>Enter 10 - 20 words to create a word soup with one duplicated word.</p>
      <p>Race to find the word that appears twice!</p>

      {wordCount === 1 ? (
        <p>You have entered {wordCount} word so far.</p>
      ) : (
        <p>You have entered {wordCount} words so far.</p>
      )}

      <GenInputField
        stateUpdatingFunction={setSpotItInput}
        name="spotItInput"
        type="text"
        label="Enter words separated by commas:"
        value={spotItInput}
      />
      <div className={classes.buttonContainer}>
        <button disabled={isLoading} onClick={handleSubmit}>
          Create
        </button>
      </div>

      <p>
        Or enter a description of the words you'd like to use, for example:
        "Basic short E words."
      </p>

      <GenInputField
        stateUpdatingFunction={setSpotItRequest}
        name="spotItRequest"
        type="text"
        label="Enter your description:"
        value={spotItRequest}
      />

      <div className={classes.buttonContainer}>
        {!isLoading && (
          <>
            <button onClick={handleGenerate}>Generate</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
        {isLoading && <DefaultLoader />}
      </div>
    </div>
  );
}
