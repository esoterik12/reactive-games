import * as React from "react";
import classes from "./SocialTabs.module.css";
import { useAppSelector } from "@/app/redux/hooks";

export interface ISocialTabsProps {
  children: React.ReactNode;
  setActiveSocial: (activeKey: string) => void;
  activeSocial: string;
}

export function SocialTabs(props: ISocialTabsProps) {
  const theme = useAppSelector((state) => state.theme.theme);

  console.log("Theme and active social: ", theme, props.activeSocial);

  const activeButtonStyles = theme === "dark" ? classes.activeButtonDark : classes.activeButtonLight;

  return (
    <div>
      <div
        className={
          theme === "light"
            ? classes.tabsContainerLight
            : classes.tabsContainerDark
        }
      >
        <button
          className={`${props.activeSocial === "feed" ? activeButtonStyles : ''}`}
          onClick={() => props.setActiveSocial("feed")}
        >
          Feed
        </button>
        <button
          className={`${props.activeSocial === "messages" ? activeButtonStyles : ''}`}
          onClick={() => props.setActiveSocial("messages")}
        >
          Messages
        </button>
        <button
          className={`${props.activeSocial === "friends" ? activeButtonStyles : ''}`}
          onClick={() => props.setActiveSocial("friends")}
        >
          Friends
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
