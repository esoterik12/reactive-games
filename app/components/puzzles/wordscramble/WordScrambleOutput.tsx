import * as React from "react";
import classes from "./WordScrambleOutput.module.css";
import { useRef } from "react";
import jsPDF from "jspdf";

export interface IWordScrambleOutputProps {
  scrambleTitle: string;
  scrambleOutput: any;
}

export function WordScrambleOutput(props: IWordScrambleOutputProps) {
  const scrambleRef = useRef<any>(null);

  // PDF Functionality //
  const generatePDF = async () => {
    const pixelWidth = 595; // A4 width in pixels
    const pixelHeight = 842; // A4 height in pixels

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pixelWidth, pixelHeight],
    });

    doc.html(scrambleRef.current, {
      x: 0,
      y: 0,
      html2canvas: {
        scale: 1,
      },
      async callback(doc) {
        doc.save("wordscrambleOutput");
      },
    });
  };

  async function handleGeneratePDF() {
    await generatePDF();
  }

  return (
    <div className={classes.scrambleContainer}>
      <button onClick={handleGeneratePDF}>Download PDF</button>
      <div ref={scrambleRef} className={classes.pdfContainer}>
        <h2>{props.scrambleTitle}</h2>
        <h4>Name: _____________</h4>
        <div className={classes.scrambleOutputContainer}>
          {props.scrambleOutput.map((word: string, index: number) => (
            <div className={classes.cardContainer} key={index}>
              <p>{word}</p>
              <p>_____________</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
