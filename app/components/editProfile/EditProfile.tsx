"use client";
import * as React from "react";
import { useState, useRef } from "react";
import images from "../../../public/assets/avatars/images";
import Image from "next/image";
import classes from "./EditProfile.module.css";
import { CountrySelect } from "./CountrySelect";
import { StaticImageData } from "next/image";
import { FieldSelect } from "./FieldSelect";

interface Image {
  src: StaticImageData;
  alt: string;
}

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<Image>();
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedField, setSelectedField] = useState<string>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  function handleSelectImage(image: Image) {
    setSelectedImage(image);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const selectedUsername = usernameRef.current?.value
    const selectedDate = dateRef.current?.value
    // ADD post request here
  }

  return (
    <div className={classes.editProfileContainer}>
      <form className={classes.editProfile}>
        <h3>Edit Your Profile</h3>
        <p>
          <label htmlFor="title">Add a username</label>
          <input type="text" name="title" id="title" ref={usernameRef} />
        </p>

        <CountrySelect setSelectedCountry={setSelectedCountry} />

        <FieldSelect setSelectedField={setSelectedField} />

        <p>
          <label htmlFor="deadline">Birthday</label>
          <input type="date" name="deadline" id="deadline" ref={dateRef} />
        </p>

        <div>
          <p>Choose an Avatar</p>
          <ul className={classes.editProfileImages}>
            {images.map((image) => (
              <li
                className={
                  selectedImage === image ? classes.selectedImage : undefined
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
        <button onClick={handleSubmit} className={classes.editProfileButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
