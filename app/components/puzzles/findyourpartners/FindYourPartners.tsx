import { useState, useRef } from "react";
import { DefaultLoader } from "../../common/thirdparty";
import classes from "./FindYourPartners.module.css";
import { PartnersInput } from "./PartnersInput";
import { PartnersPreview } from "./PartnersPreview";
import { PartnersOutput } from "./PartnersOutput";
import { SaveButton } from "../../input/SaveButton";
import generatePDF from "@/utils/pdf/generatePDF";

export interface outputData {
  data: { [key: string]: string[] };
  title: string;
}
export function FindYourPartners() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputData, setOutputData] = useState<outputData | null>(null);
  const [finalData, setFinalData] = useState<any>();
  const [saved, setSaved] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setOutputData(null);
    setFinalData(null);
  }

  function handleGeneratePDF() {
    generatePDF(printRef.current, "BingoPDF");
  }

  const partnersSave = {
    title: outputData?.title,
    output: finalData,
    dataType: "partners",
  };

  return (
    <div className={classes.partnerContainer}>
      {isLoading && (
        <div className={classes.loadingSpinnerContainer}>
          <DefaultLoader />
        </div>
      )}
      {!outputData && !isLoading && !finalData && (
        <PartnersInput
          setIsLoading={setIsLoading}
          setOutputData={setOutputData}
          isLoading={isLoading}
        />
      )}
      {outputData && !finalData && (
        <PartnersPreview
          outputData={outputData}
          setOutputData={setOutputData}
          setFinalData={setFinalData}
        />
      )}
      {finalData && (
        <>
          <h2>Preview Your Cards:</h2>
          <p>Download your final version.</p>
          <div className={classes.buttonContainer}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGeneratePDF}>Download PDF</button>
            <SaveButton
              saveObject={partnersSave}
              saved={saved}
              setSaved={setSaved}
            />
          </div>
          <PartnersOutput finalData={finalData} printRef={printRef}/>
        </>
      )}
    </div>
  );
}
