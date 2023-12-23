import * as React from "react";
import classes from "./PreviewOutput.module.css";
import { FinalOutput } from "./FinalOutput";

export interface IPreviewOutputProps {
  outputData: {
    [key: string]: string[];
  };
  setFinalSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  finalSubmitted: boolean;
}

export const PreviewOutput: React.FC<IPreviewOutputProps> = ({
  outputData,
  setFinalSubmitted,
  finalSubmitted,
}) => {
  const [finalData, setFinalData] = React.useState<any>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData) as { [key: string]: string };
    console.log(formProps);
    setFinalData(formProps);
    setFinalSubmitted(true);
    console.log("Final data: ", finalData);
  };

  return (
    <>
      {!finalSubmitted && (
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
          <div className={classes.partnerOutputContainer}>
            {Object.keys(outputData).map((key) => (
              <div key={key}>
                <div className={classes.cardContainer}>
                  <input name={key} defaultValue={key} />
                </div>
                <div className={classes.cardContainer}>
                  <input
                    name={`${key}_value`}
                    defaultValue={outputData[key][0]}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}
      {finalSubmitted && <FinalOutput finalData={finalData} />}
    </>
  );
};
