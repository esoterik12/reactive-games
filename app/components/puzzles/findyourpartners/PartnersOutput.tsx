import classes from "./PartnersOutput.module.css";
import * as React from "react";

export interface IPartnersOutputProps {
  finalData: {
    [key: string]: string;
  };
  printRef: React.RefObject<HTMLDivElement>;
}

export function PartnersOutput(props: IPartnersOutputProps) {
  return (
    <div ref={props.printRef} className={classes.pdfContainer}>
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
