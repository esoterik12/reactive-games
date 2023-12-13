import * as React from "react";

export interface IPuzzlesMenuProps {}

interface ListItem {
  key: string;
  name: string;
}

const IDEA_PUZZLES = [
  {
    key: "l1",
    name: "Cryptograms",
  },
  {
    key: "l2",
    name: "Crosswords",
  },
  {
    key: "l3",
    name: "Wordsearch",
  },
  {
    key: "l4",
    name: "Find Your Partner",
  },
  {
    key: "l5",
    name: "Word Scramble",
  },
];

export function PuzzlesMenu(props: IPuzzlesMenuProps) {
  return (
    <div>
      <p>Puzzles Menu</p>
      <ol>
        {IDEA_PUZZLES.map((item: ListItem) => (
          <li key={item.key}>
            <p>{item.name}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
