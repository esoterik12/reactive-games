import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./FindYourPartners.module.css";
import { PartnersInput } from "./PartnersInput";
import { PartnersPreview } from "./PartnersPreview";
import { PartnersOutput } from "./PartnersOutput";
import { SaveButton } from "../../input/SaveButton";

export interface outputData {
  data: {[key: string]: string[]}
  title: string
}
export function FindYourPartners() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputData, setOutputData] = useState<outputData | null>(null);
  const [finalData, setFinalData] = useState<any>();
  const [saved, setSaved] = useState(false);

  function handleReset() {
    setOutputData(null);
    setFinalData(null);
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
          <CircularProgress />
        </div>
      )}
      {!outputData && !isLoading && !finalData && (
        <PartnersInput
          setIsLoading={setIsLoading}
          setOutputData={setOutputData}
          isLoading={isLoading}
        />
      )}
      {outputData && (
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
            <SaveButton
              saveObject={partnersSave}
              saved={saved}
              setSaved={setSaved}
            />
          </div>
          <PartnersOutput finalData={finalData} />
        </>
      )}
    </div>
  );
}
