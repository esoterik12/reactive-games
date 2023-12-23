import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classes from './FindYourPartners.module.css'
import { PartnersInput } from "./PartnersInput";
import { PartnersPreview } from "./PartnersPreview";
import { PartnersOutput } from "./PartnersOutput";

export interface outputData {
  [key: string]: string[];
}
export function FindYourPartners() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputData, setOutputData] = useState<outputData | null>(null);
  const [finalData, setFinalData] = useState<any>();

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
      {outputData && <PartnersPreview 
          outputData={outputData}
          setOutputData={setOutputData}
          setFinalData={setFinalData}
      />}
      {finalData && <PartnersOutput 
        finalData={finalData}
        setOutputData={setOutputData}
        setFinalData={setFinalData}

      />}
    </div>
  );
}
