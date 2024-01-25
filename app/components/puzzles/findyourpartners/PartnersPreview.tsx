import * as React from "react";
import { outputData } from "./FindYourPartners";
import classes from "./PartnersPreview.module.css";

export interface IPartnersPreviewProps {
  outputData: outputData;
  setFinalData: React.Dispatch<React.SetStateAction<{} | null>>;
  setOutputData: React.Dispatch<React.SetStateAction<outputData | null>>;
}

export function PartnersPreview(props: IPartnersPreviewProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData) as { [key: string]: string };
    console.log(formProps);
    props.setFinalData(formProps);
  };

  function handleReset() {
    props.setOutputData(null);
  }

  return (
    <div>
      <h2>Preview Your Cards:</h2>
      <p>Edit the output.</p>

      <form onSubmit={handleSubmit}>
        <div className={classes.outputButtonsContainer}>
          <button onClick={handleReset}>Reset</button>
          <button type="submit">Submit</button>
        </div>
        <div className={classes.pdfContainer}>
          <div className={classes.partnerOutputContainer}>
            {Object.keys(props.outputData.data).map((key) => (
              <div key={key}>
                <div className={classes.cardContainer}>
                  <input name={key} defaultValue={key} />
                </div>
                <div className={classes.cardContainer}>
                  <input
                    name={`${key}_value`}
                    defaultValue={props.outputData.data[key][0]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
