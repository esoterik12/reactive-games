import * as React from "react";
import classes from "./FieldSelect.module.css";

export interface IFieldSelectProps {
  setSelectedField: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function FieldSelect(props: IFieldSelectProps) {
  const handleSelectField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelectedField(event.target.value);
  };

  return (
    <div className={classes.selectContainer}>
      <label htmlFor="field">Choose your field</label>
      <select name="field" id="field" onChange={handleSelectField}>
        {fields.map((field) => (
          <option key={field.id} value={field.field}>
            {field.field}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CountryType {
  id: string;
  field: string;
}

const fields: readonly CountryType[] = [
  { id: "a0", field: "-" },
  { id: "a1", field: "Preschool" },
  { id: "a2", field: "Elementary" },
  { id: "a3", field: "Middle School" },
  { id: "a4", field: "High School" },
  { id: "a5", field: "Private Education" },
  { id: "a6", field: "Higher Education" },
];
