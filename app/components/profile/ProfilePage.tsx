import * as React from "react";
import { useSession } from "next-auth/react";
import classes from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "next/link";

export interface IProfilePageProps {}

interface ProfileData {
  data: {
    joinedDate: string;
    email: string;
    country: string | null;
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

  return (
    <div className={classes.profileContainer}>
      {!profileData ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.profileTop}>
            <h2>Profile Page</h2>
            <p>Username: {profileData?.data?.email}</p>
            <p>Joined Date: {formattedDate}</p>
            <Link href="/edit-profile" >Edit Profile</Link>
          </div>
          <br className={classes.linebreak} />
          <div className={classes.profileBottom}>
            <h3>Profile Details</h3>
            <p>Username: {session?.user?.email}</p>
            <p>Joined Date: </p>
          </div>
          
        </>
      )}
    </div>
  );
}
