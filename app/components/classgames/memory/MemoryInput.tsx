import * as React from "react";
import classes from "./MemoryInput.module.css";
import { wordsData } from "./Memory";
import { validateMemory } from "@/utils/validation/validateMemory";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";

export interface IMemoryInputProps {
  setWordsData: React.Dispatch<React.SetStateAction<wordsData>>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MemoryInput(props: IMemoryInputProps) {
  const dispatch = useDispatch();
  const pairArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]; 
  const [memoryInput, setMemoryInput] = React.useState<{
    [key: string]: string;
  }>({});

  // spreads the previous input and creates a new object with the target name and target value
  // triggered by onChange handler
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMemoryInput({ ...memoryInput, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      validateMemory(memoryInput)
    } catch (error) {
      dispatch(setMessage(`${error}`))
      dispatch(toggleModal())
      return
    }

    const newInputObject: any = {};
    let pairNumber: number = 0; // to create matching pair numbers

    console.log("Memory Input: ", memoryInput)

    for (const key in memoryInput) {
      if (parseInt(key) % 2 !== 0 && parseInt(key) !== 2) {
        pairNumber++;
      }

      if (memoryInput.hasOwnProperty(key)) {
        newInputObject[key] = {
          word: memoryInput[key],
          number: pairNumber,
          visible: false,
          completed: false,
        };
      }
    }
    props.setWordsData(newInputObject)
    props.setIsSubmitted(true)
  }

  function handleReset() {
    setMemoryInput({}); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.inputContainer}>
        {pairArray.map((pairNumber, index) => (
          <div key={`${index}-${pairNumber}`} className={classes.inputItem}>
            <input
              type="text"
              name={`${index + 1}`}
              value={memoryInput[`${index + 1}`] || ""}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={handleReset}>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
