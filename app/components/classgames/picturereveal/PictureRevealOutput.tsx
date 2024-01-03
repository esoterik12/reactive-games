import * as React from "react";
import { DUMMY_IMAGES } from "./DUMMY_IMAGES";
import classes from "./PictureRevealOutput.module.css";
import Image from "next/image";

export interface IPictureRevealOutputProps {}

export function PictureRevealOutput(props: IPictureRevealOutputProps) {
  const [tilesArray, setTilesArray] = React.useState<number[]>([]);
  const [indexArray, setIndexArray] = React.useState<number[] | undefined>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imgIndex, setImgIndex] = React.useState(0);

  React.useEffect(() => {
    const shuffleArray = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const tiles: number[] = new Array(64).fill(2);
    setTilesArray(tiles);

    const indexes: number[] = Array.from({ length: 64 }, (_, i) => i);
    shuffleArray(indexes);
    setIndexArray(indexes);
  }, []);

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

  function handleRevealAll() {
    setTilesArray((prevTilesArray: number[]) => {
      const updatedTiles = [...prevTilesArray];
      updatedTiles.fill(1);
      return updatedTiles;
    });
  }

  function handleNext() {
    setCurrentIndex(0)
    setTilesArray((prevTilesArray: number[]) => {
      const updatedTiles = [...prevTilesArray];
      updatedTiles.fill(2);
      return updatedTiles;
    });
    if (imgIndex < DUMMY_IMAGES.length-1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else {
      setImgIndex(0)
    }
  }

  return (
    <div className={classes.imgContainer}>
      <Image
        src={DUMMY_IMAGES[imgIndex].url}
        className={classes.imgMain}
        width={600}
        height={600}
        quality={30}
        alt={`Picture: ${DUMMY_IMAGES[imgIndex].name}`}
      />

      <div className={classes.tileContainer}>
        {tilesArray.map((tile: number, index: number) => {
          if (tile === 2) {
            return <div key={index} className={classes.imgTile}></div>;
          } else {
            return <div key={index} className={classes.imgShow}></div>;
          }
        })}
      </div>

      <div className={classes.buttonContainer}>
        {/* <button onClick={handleNext}>Next</button> */}
        <button onClick={handleReveal}>Reveal</button>
        <button onClick={handleRevealAll}>Reveal All</button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* {DUMMY_IMAGES.map((img) => (
        <div key={img.id}>
          <Image
            src={img.url}
            width={500}
            height={500}
            quality={30}
            alt={`Picture: ${img.name}`}
          />
        </div>
      ))} */}
    </div>
  );
}
