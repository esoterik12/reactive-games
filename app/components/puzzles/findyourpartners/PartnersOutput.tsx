import classes from "./PartnersOutput.module.css";
import * as React from "react";
import generatePDF from "@/utils/pdf/generatePDF";

export interface IPartnersOutputProps {
  finalData: {
    [key: string]: string;
  };
}

export function PartnersOutput(props: IPartnersOutputProps) {
  const partnerRef = React.useRef<any>(null);

  async function handleGeneratePDF() {
    generatePDF(partnerRef.current, "FindYourPartnerPDF");
  }

  return (
    <>
      <div className={classes.outputButtonsContainer}>
        <button onClick={handleGeneratePDF}>Download PDF</button>
      </div>
      <div ref={partnerRef} className={classes.pdfContainer}>
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
    </>
  );
}
