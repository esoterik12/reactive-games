import * as React from "react";
import classes from "./PartnersInput.module.css";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import { gptObjectCreator } from "@/utils/text-extractors/gptObjectCreator";
import { outputData } from "./FindYourPartners";
import { validatePartners } from "@/utils/validation/validatePartners";
import { IPartnersData } from "@/utils/validation/validatePartners";

export interface IPartnersInputProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOutputData: React.Dispatch<
    React.SetStateAction<outputData | null>
  >;
  isLoading: boolean;
}

export function PartnersInput(props: IPartnersInputProps) {
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.setIsLoading(true);
    props.setOutputData(null);
    const fd = new FormData(event.target as HTMLFormElement);
    const partnersData: IPartnersData = {
      title: fd.get('title') as string,
      words: fd.get('words') as string,
      options: fd.get('options') as string
    }

    try {
      validatePartners(partnersData)

      const response = await fetch("/api/generators/find-your-partner", {
        method: "POST",
        body: JSON.stringify({
          words: partnersData.words,
          options: partnersData.options,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(
          "Error with response in fetch request in tsx file: ",
          errorData
        );
        dispatch(setMessage("Error - please try again."));
        dispatch(toggleModal());
        props.setIsLoading(false);
      }

      if (response.ok) {
        const responseData = await response.json();
        const extractedJson = gptObjectCreator(responseData);
        console.log("Success with JSON extraction: ", extractedJson);
        props.setIsLoading(false);
        props.setOutputData({data: extractedJson, title: partnersData.title});
      }
    } catch (error) {
      console.log("Error from catch: ", error);
      dispatch(setMessage("Error - please try again."));
      dispatch(toggleModal());
      props.setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Find Your Partner</h2>
      <form onSubmit={handleSubmit} className={classes.partnerInput}>
        <p>Enter all your words separeated by commas.</p>
        <p>Carefully consider the words you use for synonyms and antonyms.</p>
        {/* <p>fat, mash, cap, sad, wet, peg, kit, fish, seen, well, for, cry</p> */}
        <label className={classes.formLabel} htmlFor="title">
          Enter a title:
        </label>
        <input type="text" name="title" id="title" />
        <label className={classes.formLabel} htmlFor="words">
          Enter your words:
        </label>
        <input type="text" name="words" id="words" />

        <div>
          <label className={classes.formLabel} htmlFor="options">
            Choose how you'd like your matching pairs to be generated.
          </label>
          <select name="options" id="options">
            <option value="rhyme">Rhyming pairs</option>
            <option value="synonym">Synonyms</option>
            <option value="antonym">Antonyms</option>
          </select>
        </div>
        {!props.isLoading && (
          <>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </div>
  );
}
