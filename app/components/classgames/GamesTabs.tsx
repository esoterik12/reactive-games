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
    setMenuOpen(false)
  }, [props.activeGame])

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
            <p onClick={() => props.setActiveGame("memory")}>
              Memory
            </p>
            <p onClick={() => props.setActiveGame("bingo")}>
              Bingo
            </p>
            <p onClick={() => props.setActiveGame("wordsearch")}>
              Wordsearch
            </p>
            <p onClick={() => props.setActiveGame("wordscramble")}>
              Word Scramble
            </p>
            <p onClick={() => props.setActiveGame("findyourpartner")}>
              Find Your Partner
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
            props.activeGame === "bingo" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("bingo")}
        >
          Bingo
        </button>
        <button
          className={`${
            props.activeGame === "wordsearch" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("wordsearch")}
        >
          Wordsearch
        </button>
        <button
          className={`${
            props.activeGame === "wordscramble" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("wordscramble")}
        >
          Word Scramble
        </button>
        <button
          className={`${
            props.activeGame === "findyourpartner" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGame("findyourpartner")}
        >
          Find Your Partner
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
