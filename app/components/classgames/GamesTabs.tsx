import * as React from "react";
import { useState, useRef } from "react";
import classes from "./GamesTabs.module.css";
import { useAppSelector } from "@/app/redux/hooks";

export interface IGamesTabsProps {
  children: React.ReactNode;
  setActiveGame: (activeKey: string) => void;
  activeGame: string;
}

export function GamesTabs(props: IGamesTabsProps) {
  const theme = useAppSelector((state) => state.theme.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // handles the event the user clicks away from the menu
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, props.activeGame]);

  // closes the menu once a selection is made
  React.useEffect(() => {
    setMenuOpen(false);
  }, [props.activeGame]);

  const activeButtonStyles =
    theme === "dark" ? classes.activeButtonDark : classes.activeButtonLight;

  return (
    <div>
      <div
        className={
          theme === "light" ? classes.hamburgerLight : classes.hamburgerDark
        }
      >
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        {menuOpen && (
          <div ref={dropdownRef} className={classes.dropdown}>
            <p onClick={() => props.setActiveGame("memory")}>Memory</p>
            <p onClick={() => props.setActiveGame("minefield")}>Minefield</p>
            <p onClick={() => props.setActiveGame("spotit")}>Spot It</p>
            <p onClick={() => props.setActiveGame("picturereveal")}>
              Picture Reveal
            </p>
            <p onClick={() => props.setActiveGame("jeopardy")}>
              Jeopardy
            </p>
          </div>
        )}
      </div>
      <div
        className={
          theme === "light"
            ? classes.tabsContainerLight
            : classes.tabsContainerDark
        }
      >
        <button
          className={`${
            props.activeGame === "memory" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("memory")}
        >
          Memory
        </button>
        <button
          className={`${
            props.activeGame === "minefield" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("minefield")}
        >
          Minefield
        </button>
        <button
          className={`${
            props.activeGame === "spotit" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("spotit")}
        >
          Spot It
        </button>
        <button
          className={`${
            props.activeGame === "picturereveal" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("picturereveal")}
        >
          Picture Reveal
        </button>
        <button
          className={`${
            props.activeGame === "jeopardy" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("jeopardy")}
        >
          Jeopardy
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
