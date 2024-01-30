import * as React from "react";
import { PictureRevealOutput } from "./PictureRevealOutput";
import { PictureRevealInput } from "./PictureRevealInput";
import { useDispatch } from "react-redux";
import { setMessage, toggleModal } from "@/app/redux/modalSlice";
import { DefaultGameContainer } from "../../common/containers/DefaultGameContainer";

export interface IPictureRevealProps {}

export function PictureReveal(props: IPictureRevealProps) {
  const [pictureLinks, setPictureLinks] = React.useState<string[]>(
    Array(15).fill("")
  );
  const [invalidImages, setInvalidImages] = React.useState(0);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const dispatch = useDispatch();

  function handleReset() {
    setIsSubmit(false);
    setPictureLinks(Array(15).fill(""));
  }

  // Displays a modal if the user has input invalid images
  // and they have been removed from the input.
  React.useEffect(() => {
    if (invalidImages > 0) {
      dispatch(
        setMessage(
          `You have input ${invalidImages} invalid ${
            invalidImages === 1 ? "link" : "links"
          }. ${
            invalidImages === 1 ? "It has" : "They have"
          } been removed from the input.`
        )
      );
      dispatch(toggleModal());
    }
  }, [invalidImages, dispatch]);

  const pictureRevealSave = {
    save: {
      title: "placeholderPictureRevealTitle",
      output: pictureLinks,
      dataType: "pictureReveal",
    },
    outputComplete: isSubmit,
  };
 
  return (
    <DefaultGameContainer
      saveGameObject={pictureRevealSave}
      resetFunction={handleReset}
    >
      {!isSubmit && (
        <PictureRevealInput
          pictureLinks={pictureLinks}
          setPictureLinks={setPictureLinks}
          setIsSubmit={setIsSubmit}
          setInvalidImages={setInvalidImages}
          handleReset={handleReset}
        />
      )}
      {isSubmit && (
        <PictureRevealOutput
          pictureLinks={pictureLinks}
          setIsSubmit={setIsSubmit}
          setPictureLinks={setPictureLinks}
        />
      )}
    </DefaultGameContainer>
  );
}
