import * as React from "react";
import classes from './CryptogramOutput.module.css'

export interface ICryptogramOutputProps {
  cryptogramOutput: [];
  printRef: React.RefObject<HTMLDivElement>;
}

export function CryptogramOutput(props: ICryptogramOutputProps) {
  return (
    <div className={classes.cryptogramOutputContainer}>
      <h2>Preview Output</h2>
      <div ref={props.printRef} className={classes.cryptoOutput}>
        <div>
          <p>Name:_____________ </p>
        </div>
        {props.cryptogramOutput.map((subArray: [], idx) => {
          return (
            <div key={idx} className={classes.cryptoOutputRow}>
              {subArray.map((element, subIdx) => {
                if (element === "  ") {
                  return (
                    <div key={`${idx}${subIdx}`}>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={`${idx}${subIdx}`}>
                      <p>{element}</p>
                      <p>__</p>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
