import * as React from "react";
import { useState, useRef } from "react";
import classes from "./PuzzlesTabs.module.css";

export interface IPuzzlesTabsProps {
  children: React.ReactNode;
  setActivePuzzle: (activeKey: string) => void;
  activePuzzle: string;
}

export function PuzzlesTabs(props: IPuzzlesTabsProps) {
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
    setMenuOpen(false);
  }, [props.activePuzzle]);

  const activeButtonStyles = classes.activeButtonLight;

  return (
    <div>
      <div className={classes.hamburgerLight}>
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        {menuOpen && (
          <div ref={dropdownRef} className={classes.dropdown}>
            <p onClick={() => props.setActivePuzzle("cryptogram")}>
              Cryptogram
            </p>
            <p onClick={() => props.setActivePuzzle("bingo")}>Bingo</p>
            <p onClick={() => props.setActivePuzzle("wordsearch")}>
              Wordsearch
            </p>
            <p onClick={() => props.setActivePuzzle("wordscramble")}>
              Word Scramble
            </p>
            <p onClick={() => props.setActivePuzzle("findyourpartner")}>
              Find Your Partner
            </p>
          </div>
        )}
      </div>
      <div className={classes.tabsContainerLight}>
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
            props.activePuzzle === "wordscramble" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("wordscramble")}
        >
          Word Scramble
        </button>
        <button
          className={`${
            props.activePuzzle === "findyourpartner" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActivePuzzle("findyourpartner")}
        >
          Find Your Partner
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
