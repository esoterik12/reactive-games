import * as React from "react";
import classes from "./SpotIt.module.css";
import { SpotItInput } from "./SpotItInput";
import { useSelector } from "react-redux";
import { SpotItOutput } from "./SpotItOutput";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";
import { useDispatch } from "react-redux";
import { resetWords } from "@/app/redux/spotitSlice";

export function SpotIt() {
  const displayArray = useSelector((state: any) => state.spotIt.displayArray);
  const changed = useSelector((state: any) => state.spotIt.changed);
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(resetWords());
  }

  const spotItData = {
    outputComplete: changed,
  };

  return (
    <DefaultGameContainer
      resetFunction={handleReset}
      saveGameObject={spotItData}
    >
      {!changed && (
        <div>
          <SpotItInput />
        </div>
      )}

      {changed && <SpotItOutput displayArray={displayArray} />}
    </DefaultGameContainer>
  );
}
