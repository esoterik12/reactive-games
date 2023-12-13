import * as React from "react";
import classes from "./ProfileMenu.module.css";
import { useAppSelector } from "@/app/redux/hooks";

interface LinkItem {
  key: string;
  name: string;
  active: string;
}

const DUMMY_LINKS = [
  {
    key: "l1",
    name: "Profile Page",
    active: "profilePage",
  },
  {
    key: "l3",
    name: "Social & Feed",
    active: "socialFeed",
  },
  {
    key: "l4",
    name: "My Puzzles",
    active: "myPuzzles",
  },
  {
    key: "l2",
    name: "Puzzle Creators",
    active: "puzzleCreators",
  },
  {
    key: "l5",
    name: "Classroom Games",
    active: "classroomGames",
  },
];

export interface IProfileMenuProps {
  setActive: (activeKey: string) => void;
  active: string;
}

export function ProfileMenu(props: IProfileMenuProps) {
  const theme = useAppSelector((state) => state.theme.theme);

  const handleClick = (activeKey: string) => {
    props.setActive(activeKey);
  };

  let activeStyles:any;
  theme === "light"
    ? activeStyles = classes.buttonContainerActiveLight
    : activeStyles = classes.buttonContainerActiveDark;

  return (
    <div className={classes.menuContainer}>
      {DUMMY_LINKS.map((link: LinkItem) => (
        <div
          key={link.key}
          className={
            props.active === link.active
              ? activeStyles
              : classes.buttonContainer
          }
        >
          <button
            className={classes.menuLink}
            onClick={() => handleClick(link.active)}
          >
            {link.name}
          </button>
        </div>
      ))}
    </div>
  );
}
