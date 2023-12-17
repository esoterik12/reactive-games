import * as React from "react";
import { useState, useRef } from "react";
import classes from "./PuzzlesTabs.module.css";
import { useAppSelector } from "@/app/redux/hooks";
import { current } from "@reduxjs/toolkit";

export interface IPuzzlesTabsProps {
  children: React.ReactNode;
  setActivePuzzle: (activeKey: string) => void;
  activePuzzle: string;
}

export function PuzzlesTabs(props: IPuzzlesTabsProps) {
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
  }, [dropdownRef, props.activePuzzle]);

  // closes the menu once a selection is made
  React.useEffect(() => {
    setMenuOpen(false)
  }, [props.activePuzzle])

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
            <p onClick={() => props.setActivePuzzle("cryptogram")}>
              Cryptogram
            </p>
            <p onClick={() => props.setActivePuzzle("bingo")}>
              Bingo
            </p>
            <p onClick={() => props.setActivePuzzle("wordsearch")}>
              Wordsearch
            </p>
            <p onClick={() => props.setActivePuzzle("wordScramble")}>
              Word Scramble
            </p>
            <p onClick={() => props.setActivePuzzle("findYourPartner")}>
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
            props.activePuzzle === "cryptogram" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("cryptogram")}
        >
          Cryptogram
        </button>
        <button
          className={`${
            props.activePuzzle === "bingo" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("bingo")}
        >
          Bingo
        </button>
        <button
          className={`${
            props.activePuzzle === "wordsearch" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("wordsearch")}
        >
          Wordsearch
        </button>
        <button
          className={`${
            props.activePuzzle === "wordScramble" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("wordScramble")}
        >
          Word Scramble
        </button>
        <button
          className={`${
            props.activePuzzle === "findYourPartner" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("findYourPartner")}
        >
          Find Your Partner
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
