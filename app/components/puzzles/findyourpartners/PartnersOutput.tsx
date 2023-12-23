import classes from "./PartnersOutput.module.css";
import { outputData } from "./FindYourPartners";
import * as React from "react";
import jsPDF from "jspdf";

export interface IPartnersOutputProps {
  setOutputData: React.Dispatch<React.SetStateAction<outputData | null>>;
  setFinalData: React.Dispatch<React.SetStateAction<{} | null>>;
  finalData: {
    [key: string]: string;
  };
}

export function PartnersOutput(props: IPartnersOutputProps) {
  const partnerRef = React.useRef<any>(null);

  const generatePDF = async () => {
    const pixelWidth = 595; // A4 width in pixels
    const pixelHeight = 842; // A4 height in pixels

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pixelWidth, pixelHeight],
    });

    doc.html(partnerRef.current, {
      x: 0,
      y: 0,
      html2canvas: {
        scale: 1,
      },
      async callback(doc) {
        doc.save("findyourpartnerOutput");
      },
    });
  };

  async function handleGeneratePDF() {
    await generatePDF();
    props.setFinalData(null)
  }

  function handleReset() {
    props.setOutputData(null);
    props.setFinalData(null)
  }

  return (
    <>
      <h2>Preview Your Cards:</h2>
      <p>Download your final version.</p>
      <div className={classes.outputButtonsContainer}>
        <button onClick={handleReset}>Reset</button>
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
