import { useState, useRef } from "react";
import { DefaultLoader } from "../../common/thirdparty";
import classes from "./FindYourPartners.module.css";
import { PartnersInput } from "./PartnersInput";
import { PartnersPreview } from "./PartnersPreview";
import { PartnersOutput } from "./PartnersOutput";
import { DefaultContainer } from "../../common/containers/DefaultContainer";

export interface outputData {
  data: { [key: string]: string[] };
  title: string;
}
export function FindYourPartners() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputData, setOutputData] = useState<outputData | null>(null);
  const [finalData, setFinalData] = useState<any>();
  const printRef = useRef<HTMLDivElement>(null);

  function handleReset() {
    setOutputData(null);
    setFinalData(null);
  }

  const partnersData = {
    save: {
      title: outputData?.title || null,
      output: finalData,
      dataType: "partners",
    },
    outputComplete: !!finalData,
    pdfTitle: "FindYourPartnersPDF",
  };

  return (
    <DefaultContainer
      printRef={printRef}
      resetFunction={handleReset}
      saveObject={partnersData}
    >
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
          <PartnersOutput finalData={finalData} printRef={printRef} />
        </>
      )}
    </DefaultContainer>
  );
}
