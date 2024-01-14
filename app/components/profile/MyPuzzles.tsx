import * as React from "react";
import { WordScramble } from "../puzzles/wordscramble/WordScramble";
import { useDispatch } from "react-redux";
import { setLoad, clearLoad } from "@/app/redux/loadslice";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import classes from "./MyPuzzles.module.css";
import { WordScrambleOutput } from "../puzzles/wordscramble/WordScrambleOutput";
import { useSelector } from "react-redux";

// Current situation:
// This only works with WordScramble now.
// Major functionality is to make it work for all outputs / generators.
// Add Delete functionality

export interface IMyPuzzlesProps {}

interface JsonData {
  scrambleTitle: string;
  scrambleInput: string;
  dataType: string;
}

interface UserWork {
  id: number;
  user_email: string;
  work_data_type: string;
  creation_date: Date;
  json_data: JsonData;
}

export function MyPuzzles(props: IMyPuzzlesProps) {
  const [puzzles, setPuzzles] = React.useState<UserWork[]>([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const loadedData = useSelector((state: any) => state.load.loadedData);

  // Function to fetch SQL data for user puzzles and set the returned data to state
  async function loadPuzzles() {
    try {
      const response = await fetch("/api/load");
      if (!response.ok) {
        dispatch(setMessage("Network response error."));
        dispatch(toggleModal());
        throw new Error("Network response error.");
      }
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPuzzles(data.data as UserWork[]);
      } else {
        console.error("Data is not an array");
        dispatch(setMessage("Data error"));
        dispatch(toggleModal());
      }
    } catch (error) {
      console.log("Fetch error in MyPuzzles: ", error);
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

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

  //
  async function handleDelete(puzzleId: number) {
    console.log("delete handler clicked - puzzleId: ", puzzleId);
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
        await loadPuzzles()
      }

      if (!response.ok) {
        console.log("Delete failed.");
        dispatch(setMessage("Delete failed."));
        dispatch(toggleModal());
      }
    } catch (error: any) {
      console.log("Delete failed.");
      dispatch(setMessage("Delete failed."));
      dispatch(toggleModal());
    }
  }

  return (
    <div className={classes.pageContainer}>
      <p>My Puzzles</p>
      {!open && <button onClick={loadPuzzles}>Load Puzzles</button>}
      {open && <button onClick={handleBack}>Back</button>}
      {!open && (
        <div className={classes.saveGrid}>
          {puzzles.map((puzzle, index) => (
            <div className={classes.saveItem} key={puzzle.id}>
              <p>{puzzle.id}</p>
              <p>{puzzle.user_email}</p>
              <p>{puzzle.work_data_type}</p>
              <p>{puzzle.creation_date.toString()}</p>
              <p>{puzzle.json_data.scrambleTitle}</p>
              <button onClick={() => handleOpen(index)}>Open</button>
              <button onClick={() => handleDelete(puzzle.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {open && loadedData.work_data_type === "scrambleOutput" && (
        <WordScrambleOutput
          scrambleTitle={loadedData.json_data.title}
          scrambleOutput={loadedData.json_data.scrambleOutput}
        />
      )}
    </div>
  );
}
