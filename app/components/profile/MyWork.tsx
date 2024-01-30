import * as React from "react";
import { useDispatch } from "react-redux";
import { setLoad, clearLoad } from "@/app/redux/loadslice";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import classes from "./MyWork.module.css";
import { WordScrambleOutput } from "../puzzles/wordscramble/WordScrambleOutput";
import { useSelector } from "react-redux";
import { DefaultLoader } from "../common/thirdparty";
import { WordsearchOutput } from "../puzzles/wordsearch/WordsearchOutput";
import { PartnersOutput } from "../puzzles/findyourpartners/PartnersOutput";
import { BingoOutput } from "../puzzles/bingo/BingoOutput";
import generatePDF from "@/utils/pdf/generatePDF";
import { CryptogramOutput } from "../puzzles/cryptogram/CryptogramOutput";
import { PictureRevealOutput } from "../classgames/picturereveal/PictureRevealOutput";
import { MemoryOutput } from "../classgames/memory/MemoryOutput";
import { JeopardyOutput } from "../classgames/jeopardy/JeopardyOutput";

export interface IMyPuzzlesProps {}

interface JsonData {
  title: string;
  output: string;
  dataType: string;
}

interface UserWork {
  id: number;
  user_email: string;
  work_data_type: string;
  creation_date: Date;
  json_data: JsonData;
}

export function MyWork(props: IMyPuzzlesProps) {
  const [puzzles, setPuzzles] = React.useState<UserWork[]>([]); // holds loaded data
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const loadedData = useSelector((state: any) => state.load.loadedData);
  const printRef = React.useRef<HTMLDivElement>(null);

  // Function to fetch SQL data for user puzzles and set the returned data to state
  async function loadPuzzles() {
    setLoading(true);
    try {
      const response = await fetch("/api/load");
      if (!response.ok) {
        dispatch(setMessage("Network response error."));
        dispatch(toggleModal());
        setLoading(false);
        throw new Error("Network response error.");
      }
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPuzzles(data.data as UserWork[]);
        setLoading(false);
      } else {
        console.error("Data is not an array");
        dispatch(setMessage("Data error"));
        dispatch(toggleModal());
        setLoading(false);
      }
    } catch (error) {
      console.log("Fetch error in MyPuzzles: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setOpen(false);
    dispatch(clearLoad());
    loadPuzzles();
  }, []);

  // Clears the loaded puzzle in Redux state
  function handleBack() {
    setOpen(false);
    dispatch(clearLoad());
  }

  // Function that sets a selected puzzle to Redux state
  function handleOpen(index: number) {
    setOpen(true);
    dispatch(setLoad(puzzles[index]));
  }

  function handleGeneratePDF() {
    generatePDF(printRef.current, "BingoPDF");
  }

  async function handleDelete(puzzleId: number) {
    setLoading(true);
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(puzzleId),
      });

      if (response.ok) {
        console.log("Delete successful.");
        await loadPuzzles();
        setLoading(false);
      }

      if (!response.ok) {
        console.log("Delete failed.");
        dispatch(setMessage("Delete failed."));
        dispatch(toggleModal());
        setLoading(false);
      }
    } catch (error: any) {
      console.log("Delete failed.");
      dispatch(setMessage("Delete failed."));
      dispatch(toggleModal());
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <DefaultLoader />
      </div>
    );
  }

  if (puzzles.length === 0) {
    return (
      <div className={classes.pageContainer}>
        <h2>You have no saved work.</h2>
        <p>
          Use Puzzle Creators or Classroom Games to create your own activities.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <h2>My Work</h2>
      <p>Revist your past work and share with other users.</p>
      {open && (
        <>
          <button onClick={handleBack}>Back</button>
          {(loadedData.work_data_type === "scrambleOutput" ||
            loadedData.work_data_type === "wordsearch" ||
            loadedData.work_data_type === "bingo" ||
            loadedData.work_data_type === "partners" ||
            loadedData.work_data_type === "cryptogram") && (
            <button onClick={handleGeneratePDF}>Download PDF</button>
          )}
        </>
      )}
      {!open && (
        <div className={classes.saveTable}>
          <div className={classes.tableHeader}>
            <p>ID</p>
            <p>Title</p>
            <p>Creator</p>
            <p>Type</p>
            <p>Date</p>
            <p>Action</p>
          </div>
          {puzzles.map((puzzle, index) => (
            <div key={puzzle.id} className={classes.saveItemContainer}>
              <div className={classes.saveItem}>
                <p>{puzzle.id}</p>
                <div
                  onClick={() => handleOpen(index)}
                  className={classes.saveItemTitle}
                >
                  <p>{puzzle.json_data.title}</p>
                </div>
                <p>{puzzle.user_email}</p>
                <p>{puzzle.work_data_type}</p>
                <p>{puzzle.creation_date.toString().slice(0, 10)}</p>
                <button onClick={() => handleDelete(puzzle.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {open && loadedData.work_data_type === "scrambleOutput" && (
        <WordScrambleOutput
          scrambleTitle={loadedData.json_data.title}
          scrambleOutput={loadedData.json_data.output}
          printRef={printRef}
        />
      )}
      {open && loadedData.work_data_type === "wordsearch" && (
        <WordsearchOutput
          wordsearchOutput={loadedData.json_data.output.wordsearchOutput}
          wordsearchInput={loadedData.json_data.output.wordsearchInput}
          wordsearchTitle={loadedData.json_data.title}
          printRef={printRef}
        />
      )}
      {open && loadedData.work_data_type === "partners" && (
        <PartnersOutput
          finalData={loadedData.json_data.output}
          printRef={printRef}
        />
      )}
      {open && loadedData.work_data_type === "bingo" && (
        <BingoOutput
          bingoOutput={loadedData.json_data.output}
          printRef={printRef}
        />
      )}
      {open && loadedData.work_data_type === "cryptogram" && (
        <CryptogramOutput
          cryptogramOutput={loadedData.json_data.output}
          printRef={printRef}
        />
      )}
      {open && loadedData.work_data_type === "pictureReveal" && (
        <PictureRevealOutput pictureLinks={loadedData.json_data.output} />
      )}
      {open && loadedData.work_data_type === "memory" && (
        <MemoryOutput
          wordsData={loadedData.json_data.output}
          isSubmitted={true}
        />
      )}
      {open && loadedData.work_data_type === "jeopardy" && (
        <JeopardyOutput jeopardyBoard={loadedData.json_data.output} />
      )}
    </div>
  );
}
