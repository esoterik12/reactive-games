import * as React from "react";
import classes from "./GenInputField.module.css";

export interface IGenInputFieldProps {
  name: string;
  label: string;
  type: string;
  stateUpdatingFunction: React.Dispatch<React.SetStateAction<string>>
}

export function GenInputField({ name, label, type, stateUpdatingFunction, ...props }: IGenInputFieldProps) {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    stateUpdatingFunction(event.target.value)
  }
  
  return (
    <div>
      <div className={classes.genInputField}>
        <label htmlFor={name}>{label}</label>
        <input onChange={handleInput} id={name} type={type} name={name} required {...props} />
      </div>
    </div>
  );
}
