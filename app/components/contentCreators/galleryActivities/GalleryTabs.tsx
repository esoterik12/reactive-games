import * as React from "react";
import { useState, useRef } from "react";
import classes from "./GalleryTabs.module.css";

export interface IGalleryTabsProps {
  children: React.ReactNode;
  setActiveGallery: (activeKey: string) => void;
  activeGallery: string;
}

export function GalleryTabs(props: IGalleryTabsProps) {
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
  }, [dropdownRef, props.activeGallery]);

  // closes the menu once a selection is made
  React.useEffect(() => {
    setMenuOpen(false);
  }, [props.activeGallery]);

  const activeButtonStyles = classes.activeButtonLight;

  return (
    <div>
      <div className={classes.hamburgerLight}>
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        {menuOpen && (
          <div ref={dropdownRef} className={classes.dropdown}>
            <p onClick={() => props.setActiveGallery("wordHunt")}>
              Word Hunt
            </p>
            <p onClick={() => props.setActiveGallery("bingo")}>Bingo</p>
            <p onClick={() => props.setActiveGallery("wordsearch")}>
              Wordsearch
            </p>
            <p onClick={() => props.setActiveGallery("wordscramble")}>
              Word Scramble
            </p>
            <p onClick={() => props.setActiveGallery("findyourpartner")}>
              Find Your Partner
            </p>
          </div>
        )}
      </div>
      <div className={classes.tabsContainerLight}>
        <button
          className={`${
            props.activeGallery === "wordHunt" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGallery("wordHunt")}
        >
          Word Hunt
        </button>
        <button
          className={`${
            props.activeGallery === "bingo" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGallery("bingo")}
        >
          Bingo
        </button>
        <button
          className={`${
            props.activeGallery === "wordsearch" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGallery("wordsearch")}
        >
          Wordsearch
        </button>
        <button
          className={`${
            props.activeGallery === "wordscramble" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGallery("wordscramble")}
        >
          Word Scramble
        </button>
        <button
          className={`${
            props.activeGallery === "findyourpartner" ? activeButtonStyles : ""
          }`}
          onClick={() => props.setActiveGallery("findyourpartner")}
        >
          Find Your Partner
        </button>
      </div>
      <div className={classes.childrenContainer}>{props.children}</div>
    </div>
  );
}
