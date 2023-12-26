"use client";
import * as React from "react";
import { ProfileMenu } from "./ProfileMenu";
import classes from "./ProfileDashboard.module.css";
import { useState } from "react";
import { ProfilePage } from "./ProfilePage";
import { SocialFeed } from "./SocialFeed";
import { MyPuzzles } from "./MyPuzzles";
import { SessionProvider } from "next-auth/react";
import { PuzzlesMenu } from "../puzzles/PuzzlesMenu";
import { GamesMenu } from "../classgames/GamesMenu";

export interface IProfileDashboardProps {}

export function ProfileDashboard(props: IProfileDashboardProps) {
  const [active, setActive] = useState("profilePage");

  return (
    <SessionProvider>
      <div className={classes.profileMainContainer}>
        <div className={classes.profileItem}>
          <ProfileMenu setActive={setActive} active={active} />
        </div>
        <div className={classes.profileItem}>
          {active === "profilePage" && <ProfilePage />}
          {active === "socialFeed" && <SocialFeed />}
          {active === "myPuzzles" && <MyPuzzles />}
          {active === "puzzleCreators" && <PuzzlesMenu />}
          {active === "classroomGames" && <GamesMenu />}
        </div>
      </div>
    </SessionProvider>
  );
}
