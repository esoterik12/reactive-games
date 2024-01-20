import * as React from "react";
import { useSession } from "next-auth/react";
import classes from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Image from "next/image";

export interface IProfilePageProps {}

interface ProfileData {
  data: {
    joinedDate: string;
    email: string;
    country: string | null;
    username: string | null;
    field: string | null;
    image: string | null;
    birthday: string | null;
  } | null;
}

export function ProfilePage(props: IProfilePageProps) {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await fetch("/api/auth/profile");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProfileData = await response.json();
        setProfileData(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch profile data: ", error);
          setError(error.message);
        }
      }
    };
    getProfileData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dateString = profileData?.data?.joinedDate;
  const formattedDate =
    dateString && new Date(dateString).toLocaleDateString("en-US");

  console.log("Profile data in ProfilePage.tsx: ", profileData);

  const userImage = `/assets/avatars/${profileData?.data?.image}.png`;

  if (!profileData) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileLeft}>
        <h2>{profileData?.data?.username}</h2>

        {userImage && (
          <div className={classes.profileImageWrapper}>
            <Image
              src={userImage}
              alt={`Profile image of ${profileData?.data?.username || "user"}`}
              width={100}
              height={100}
              className={classes.profileImage}
            />
          </div>
        )}
        <p>
          <span className={classes.detailTextMinor}>Email: </span>
          <span className={classes.detailText}>{profileData?.data?.email}</span>
        </p>
        <p>
          <span className={classes.detailTextMinor}>Joined Date: </span>
          <span className={classes.detailText}>{formattedDate}</span>
        </p>
        <div className={classes.linkContainer}>
          <Link className={classes.editLink} href="/edit-profile">
            <button>Edit Profile</button>
          </Link>
        </div>
      </div>
      <div className={classes.profileRight}>
        <p>
          <span className={classes.detailTextMinor}>Birthday: </span>
          <span className={classes.detailText}>
            {profileData?.data?.birthday}
          </span>
        </p>
        <p>
          <span className={classes.detailTextMinor}>Country: </span>
          <span className={classes.detailText}>
            {profileData?.data?.country}
          </span>
        </p>
        <p>
          <span className={classes.detailTextMinor}>Field: </span>
          <span className={classes.detailText}>{profileData?.data?.field}</span>
        </p>
      </div>
    </div>
  );
}
