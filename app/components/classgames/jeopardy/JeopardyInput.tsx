import * as React from "react";
import classes from "./JeopardyInput.module.css";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import { QuestionDataObject } from "./Jeopardy";
import { DefaultLoader } from "../../common/thirdparty";

export interface IJeopardyInputProps {
  setQuestionData: React.Dispatch<
    React.SetStateAction<QuestionDataObject | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function JeopardyInput(props: IJeopardyInputProps) {
  const {setQuestionData, loading, setLoading} = props
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    console.log("formData", formData);

    try {
      const response = await fetch("/api/generators/jeopardy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          levelDescription:
            "For students about about seven years old learning second language English.",
          vocabularyContent: formData.get("vocabulary"),
          grammarContent: formData.get("grammar"),
          phonicsContent: formData.get("phonics"),
          themeContent: formData.get("theme"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error with response in fetch request: ", errorData);
        dispatch(setMessage("Error - please try again."));
        dispatch(toggleModal());
        setLoading(false);
      }

      if (response.ok) {
        const responseData = await response.json();
        const responseObject = JSON.parse(responseData);
        setQuestionData(responseObject);
        setLoading(false);
      }
    } catch (error: any) {
      console.log("Error from catch: ", error);
      dispatch(setMessage("Error - please try again."));
      dispatch(toggleModal());
      setLoading(false);
    }
  }

  return (
    <div className={classes.jeopardyInputContainer}>
      <h2>Generate a Jeopardy Board</h2>
      <p>Paste in content to generate questions.</p>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="vocabulary">Vocabulary Content:</label>
        <textarea id="vocabulary" name="vocabulary" />
        <label htmlFor="grammar">Grammar Content:</label>
        <textarea id="grammar" name="grammar" />
        <label htmlFor="phonics">Phonics Content:</label>
        <textarea id="phonics" name="phonics" />
        <label htmlFor="theme">Theme & Reading Content:</label>
        <textarea id="theme" name="theme" />

        <div className={classes.buttonContainer}>
          {!loading && (
            <>
              <button type="submit">Generate</button>
              <button type="reset">Reset</button>
            </>
          )}
          {loading && <DefaultLoader />}
        </div>
      </form>
    </div>
  );
}
