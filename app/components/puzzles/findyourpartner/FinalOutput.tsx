import * as React from "react";
import classes from './FinalOutput.module.css'

export interface IFinalOutputProps {
  finalData: {
    [key: string]: string;
  };
}

export function FinalOutput(props: IFinalOutputProps) {
  return (
    <div>
      <div className={classes.partnerOutputContainer}>
        {Object.keys(props.finalData).map((key) => (
          <div key={key}>
            <div className={classes.cardContainer}>
              <p>{props.finalData[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
