import * as React from "react";
import Image from "next/image";
import images from "../../../public/assets/avatars/images";
import { StaticImageData } from "next/image";
import classes from './ImageSelect.module.css'

interface Image {
  src: StaticImageData;
  alt: string;
}

export interface IImageSelectProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<Image|undefined>>
  selectedImage: Image | undefined
}

export function ImageSelect(props: IImageSelectProps) {

  function handleSelectImage(image: Image) {
    props.setSelectedImage(image);
  }

  return (
    <div>
      <p>Choose an Avatar</p>
      <ul className={classes.editProfileImages}>
        {images.map((image) => (
          <li
            className={
              props.selectedImage === image ? classes.selectedImage : undefined
            }
            key={image.alt}
            onClick={() => handleSelectImage(image)}
          >
            <Image
              className={classes.editProfileImagesNextImage}
              src={image.src}
              alt={image.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
