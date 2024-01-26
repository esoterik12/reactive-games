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
import { DefaultLoader } from "../common/thirdparty";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleModal, setMessage } from "@/app/redux/modalSlice";

interface Image {
  src: StaticImageData;
  alt: string;
}

export interface ProfileData {
  username: string;
  country: string;
  field: string;
  birthday: string;
  image: string;
}

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedField, setSelectedField] = useState<string>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const updateProfile = async () => {
      // Prepare data:
      const profileData: ProfileData = {
        username: usernameRef.current?.value || "",
        country: selectedCountry || "",
        field: selectedField || "",
        birthday: dateRef.current?.value || "",
        image: selectedImage?.alt || "", // gets only alt as a reference name
      };

      // Data validation:
      try {
        editProfileValidation(profileData);
      } catch (error) {
        dispatch(setMessage(`${error}`));
        dispatch(toggleModal());
        setIsLoading(false);
        return;
      }

      // fetch request
      try {
        const response = await fetch("/api/auth/profile-update", {
          method: "POST",
          body: JSON.stringify({
            username: profileData.username,
            country: profileData.country,
            field: profileData.field,
            birthday: profileData.birthday,
            image: profileData.image,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error in profile update: ", errorData);
          dispatch(setMessage("Unknown Network or Server Error."));
          dispatch(toggleModal());
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          console.log("Profile update successful: ", response);
          dispatch(setMessage("Profile update successful!"));
          dispatch(toggleModal());
          setIsLoading(false);
          router.push("/profile");
        }
        console.log("Response in updateProfile function: ", response);
      } catch (error: any) {
        console.log(
          "Error in updateProfile function in EditProfile.tsx: ",
          error
        );
        dispatch(setMessage("Unknown Network or Server Error"));
        dispatch(toggleModal());
        setIsLoading(false);
      }
    };
    await updateProfile();
    setIsLoading(false);
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

        <div className={classes.selectField}>
          <FieldSelect setSelectedField={setSelectedField} />
        </div>

        <p>
          <label htmlFor="deadline">Birthday</label>
          <input type="date" name="deadline" id="deadline" ref={dateRef} />
        </p>

        <ImageSelect
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />

        {!isLoading && (
          <button onClick={handleSubmit} className={classes.editProfileButton}>
            Submit
          </button>
        )}

        {isLoading && (
          <div className={classes.loadingContainer}>
            <DefaultLoader />
          </div>
        )}
      </form>
    </div>
  );
}
