import classes from "./SaveButton.module.css";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";
import saveFunc from "@/utils/save-data/saveFunc";
import { SaveObject } from "../containers/DefaultContainer";
import { SaveGameObject } from "../containers/DefaultGameContainer";

interface ISaveButtonProps {
  saveObject: SaveObject | SaveGameObject;
  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SaveButton(props: ISaveButtonProps) {
  const dispatch = useDispatch();

  async function handleSaveClick() {
    dispatch(setMessage("Saving..."));
    dispatch(toggleModal());
    try {
      console.log("Scrambled Save data: ", props.saveObject.save);
      await saveFunc(props.saveObject.save);

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
