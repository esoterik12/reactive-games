"use client";
import * as React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import classes from "./EditProfile.module.css";
import { CountrySelect } from "./CountrySelect";
import { StaticImageData } from "next/image";
import { FieldSelect } from "./FieldSelect";
import { ImageSelect } from "./ImageSelect";
import editProfileValidation from "@/utils/validation/editProfile";

interface Image {
  src: StaticImageData;
  alt: string;
}

export interface ProfileData {
  username: string;
  country: string;
  field: string;
  birthday: string;
  image: Image | undefined;
}

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<Image>();
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedField, setSelectedField] = useState<string>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // DEFINE ERROR STATE TO HANDLE VALIDATION ERRORS AND FUTURE POST REQUEST ERRORS

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const selectedUsername = usernameRef.current?.value;
    const selectedDate = dateRef.current?.value;

    const profileData: ProfileData = {
      username: selectedUsername || "",
      country: selectedCountry || "",
      field: selectedField || "",
      birthday: selectedDate || "",
      image: selectedImage || undefined,
    };

    try {
      editProfileValidation(profileData);
      console.log(
        "Profile data object after validation in EditProfile.tsx: ",
        profileData
      );
    } catch (error) {
      console.log("Error in validation: ", error);
    }

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

        <ImageSelect
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />

        <button onClick={handleSubmit} className={classes.editProfileButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
