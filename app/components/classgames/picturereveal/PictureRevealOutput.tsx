import * as React from "react";
import classes from "./PictureRevealOutput.module.css";
import Image from "next/image";

// setIsSubmit and setPictureLinks are optional to allow for display of output while loading a save
export interface IPictureRevealOutputProps {
  pictureLinks: string[];
  setIsSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  setPictureLinks?: React.Dispatch<React.SetStateAction<string[]>>;
}

export function PictureRevealOutput(props: IPictureRevealOutputProps) {
  const [tilesArray, setTilesArray] = React.useState<number[]>([]);
  const [indexArray, setIndexArray] = React.useState<number[] | undefined>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imgIndex, setImgIndex] = React.useState(0);

  // This creates an array of numbers randomly shuffled to act as
  // a random order of indexes for gradually disappearing the TilesArray.
  React.useEffect(() => {
    const shuffleArray = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const tiles: number[] = new Array(64).fill(2); // Tiles array (2 = visible covering tile)
    setTilesArray(tiles);

    const indexes: number[] = Array.from({ length: 64 }, (_, i) => i); // Array 0-63
    shuffleArray(indexes); // Shuffle above array
    setIndexArray(indexes); // State update
  }, []);

  // Function uses IndexArray to disappear a random tile on each click
  function handleReveal() {
    setTilesArray((prevTilesArray: number[]) => {
      const updatedTiles = [...prevTilesArray];
      if (indexArray) {
        updatedTiles[indexArray[currentIndex]] = 1;
      }
      return updatedTiles;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  // Sets all of TilesArray to 1 to disappear all tiles
  function handleRevealAll() {
    setTilesArray((prevTilesArray: number[]) => {
      const updatedTiles = [...prevTilesArray];
      updatedTiles.fill(1);
      return updatedTiles;
    });
  }

  // Moves to next picture in picture array of objects (img links)
  function handleNext() {
    setCurrentIndex(0);
    setTilesArray((prevTilesArray: number[]) => {
      const updatedTiles = [...prevTilesArray];
      updatedTiles.fill(2);
      return updatedTiles;
    });
    if (imgIndex < props.pictureLinks.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else {
      setImgIndex(0);
    }
  }

  // Conditional loading of pictureLinks
  let handleReset;
  if (props.setPictureLinks && props.setIsSubmit) {
    handleReset = () => {
      setCurrentIndex(0);
      setImgIndex(0);
      props.setPictureLinks?.((prevLinks: string[]) => {
        const updatedLinks = [...prevLinks];
        const spacesRemaining = 15 - prevLinks.length;
        for (let i = 0; i < spacesRemaining; i++) {
          updatedLinks.push("");
        }
        return updatedLinks;
      });
      props.setIsSubmit?.(false);
    };
  }


  return (
    <div className={classes.imgContainer}>
      <Image
        src={props.pictureLinks[imgIndex]}
        className={classes.imgMain}
        width={600}
        height={600}
        quality={30}
        alt={`Picture: ${props.pictureLinks[imgIndex]}`}
      />

      <div className={classes.tileContainer}>
        {/* If array element in tiles is 2, the tile is shown */}
        {tilesArray.map((tile: number, index: number) => {
          if (tile === 2) {
            return <div key={index} className={imgIndex % 2 === 0 ? classes.imgTile : classes.imgTileAlt}></div>;
          } else {
            return <div key={index} className={classes.imgShow}></div>;
          }
        })}
      </div>

      <div className={classes.buttonContainer}>
        <button onClick={handleReveal}>Reveal</button>
        <button onClick={handleRevealAll}>Reveal All</button>
        <button onClick={handleNext}>Next</button>
        {props.setPictureLinks && props.setIsSubmit && (
          <button onClick={handleReset}>Reset All</button>
        )}
      </div>
    </div>
  );
}
