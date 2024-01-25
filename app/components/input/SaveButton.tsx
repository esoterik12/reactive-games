import classes from "./SaveButton.module.css";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import saveFunc from "@/utils/save-data/saveFunc";

interface ISaveButtonProps {
  saveObject: {};
  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SaveButton(props: ISaveButtonProps) {
  const dispatch = useDispatch();

  async function handleSaveClick() {
    dispatch(setMessage("Saving..."));
    dispatch(toggleModal());
    try {
      console.log("Scrambled Save data: ", props.saveObject);
      await saveFunc(props.saveObject);

      dispatch(setMessage("Save successful."));
      dispatch(toggleModal());
      props.setSaved(true);
    } catch (error: any) {
      console.log("Save failed in handleSaveClick in WordScramble.ts.");
      dispatch(setMessage(`${error}`));
      dispatch(toggleModal());
    }
  }

  return (
    <>
      <button
        disabled={props.saved}
        className={props.saved ? classes.savedButton : ""}
        onClick={handleSaveClick}
      >
        {props.saved ? "Saved" : "Save"}
      </button>
    </>
  );
}
