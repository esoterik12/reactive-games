import { FormEvent, useState, useRef } from "react";
import classes from "./FindYourPartner.module.css";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { gptObjectCreator } from "@/utils/text-extractors/gptObjectCreator";
import jsPDF from "jspdf";

interface outputData {
  [key: string]: string[];
}

export function FindYourPartner() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [outputData, setOutputData] = useState<outputData | null>();
  const partnerRef = useRef<any>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    setOutputData({});
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    console.log("data: ", data);

    try {
      const response = await fetch("/api/generators/find-your-partner", {
        method: "POST",
        body: JSON.stringify({
          words: data.words,
          options: data.options,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(
          "Error with response in fetch request in tsx file: ",
          errorData
        );
        dispatch(setMessage("Error - please try again."));
        dispatch(toggleModal());
        setIsLoading(false);
      }

      if (response.ok) {
        const responseData = await response.json();
        const extractedJson = gptObjectCreator(responseData);
        console.log("Success with JSON extraction: ", extractedJson);
        setIsLoading(false);
        setOutputData(extractedJson);
      }
    } catch (error) {
      console.log("Error from catch: ", error);
      dispatch(setMessage("Error - please try again."));
      dispatch(toggleModal());
      setIsLoading(false);
    }
  }

  function handleReset() {
    setIsLoading(false);
    setOutputData(null);
  }

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
  }

  return (
    <div className={classes.partnerContainer}>
      <h2>GPT-Powered Find Your Partner</h2>
      {!outputData && (
        <form onSubmit={handleSubmit} className={classes.partnerInput}>
          
          <p>Enter all your words separeated by commas.</p>
          <p>fat, mash, cap, sad, wet, peg, kit, fish, seen, well, for, cry</p>
          <label htmlFor="words">Enter your words:</label>
          <input type="text" name="words" id="words" />

          <div>
            <label htmlFor="options">
              Choose how you'd like your matching pairs to be generated.
            </label>
            <select name="options" id="options">
              <option value="rhyme">Rhyming pairs</option>
              <option value="synonym">Synonyms</option>
              <option value="antonym">Antonyms</option>
            </select>
          </div>
          {!isLoading && (
            <>
              <button type="reset" onClick={handleReset}>
                Reset
              </button>
              <button type="submit">Submit</button>
            </>
          )}
          
        </form>
      )}
      {isLoading && <CircularProgress />}
      {outputData && !isLoading && (
        <>
          <div className={classes.outputButtonsContainer}>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGeneratePDF}>Download PDF</button>
          </div>
          <div ref={partnerRef} className={classes.pdfContainer}>
            <div className={classes.partnerOutputContainer}>
              {Object.keys(outputData).map((key) => (
                <div key={key}>
                  <div className={classes.cardContainer}>
                    <p>{key}</p>
                  </div>
                  <div className={classes.cardContainer}>
                    <p>{outputData[key][0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
