import * as React from "react";
import classes from "./PictureRevealInput.module.css";
import { validatePictureLink } from "@/utils/validation/validatePictureReveal";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import { mammalsPreset, flagsPreset, vehiclesPreset } from "./picture-presents";

export interface IPictureRevealInputProps {
  pictureLinks: string[];
  setPictureLinks: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
  setInvalidImages: React.Dispatch<React.SetStateAction<number>>;
}

export function PictureRevealInput(props: IPictureRevealInputProps) {
  const dispatch = useDispatch();

  function handleInputChange(
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) {
    const target = event.target as HTMLInputElement;
    const newLinks = [...props.pictureLinks];
    newLinks[index] = target.value;
    props.setPictureLinks(newLinks);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const completeLinks: string[] = [];
    let invalidImageCount = 0;

    props.pictureLinks.forEach((link) => {
      if (link.trim() === "") {
        return;
      }
      if (validatePictureLink(link)) {
        completeLinks.push(link);
      } else {
        invalidImageCount += 1;
      }
    });

    if (completeLinks.length < 1) {
      dispatch(setMessage(`Invalid Input`));
      dispatch(toggleModal());
      return;
    }

    props.setInvalidImages(invalidImageCount);
    props.setIsSubmit(true);
    props.setPictureLinks(completeLinks);
  }



  function handlePreset(id: string[]) {
    props.setPictureLinks(id);
  }

  return (
    <div className={classes.picturesInputContianer}>
      <h2>Create Your Picture Reveal Activity</h2>
      <p>Add up to 15 links to images from Wikipedia!</p>
      <p>
        Do a Google image search prefaced by `&quot;`Wikipedia`&quot;` and paste the image
        link below.
      </p>
      <p>
        This service is limited to images hosted on Wikipedia for licensing and
        performance reasons.
      </p>
      <p>Try the presets:</p>

      <div className={classes.presetsContainer}>
        <button onClick={() => handlePreset(mammalsPreset)}>Mammals</button>
        <button onClick={() => handlePreset(flagsPreset)}>Flags</button>
        <button onClick={() => handlePreset(vehiclesPreset)}>Vehicles</button>
      </div>
      {/* <p>
        https://media.architecturaldigest.com/photos/59b046a50f5802540ef19d8f/16:9/w_1920,c_limit/GettyImages-543522135.jpg
      </p>
      <p>
        https://upload.wikimedia.org/wikipedia/commons/a/a9/Bradbury_building_Los_Angeles_c2005_01383u_crop.jpg
      </p>
      <p>
        https://upload.wikimedia.org/wikipedia/commons/e/ea/Westminster_Abbey.jpeg
      </p> */}
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        {props.pictureLinks.map((link, index) => (
          <div className={classes.linkContainer} key={index}>
            <label htmlFor="">Picture #{index + 1}</label>
            <input
              className={classes.linkInput}
              type="text"
              key={index}
              value={link}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        ))}
        <div className={classes.buttonContainer}>
          <button type="submit">Submit</button>
          <button type="reset" onClick={props.handleReset}>
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}
