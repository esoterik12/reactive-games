import * as React from "react";

export interface IClassroomGamesProps {}

interface ListItem {
  key: string;
  name: string;
}

const IDEA_GAMES = [
  {
    key: "l1",
    name: "Memory",
  },
  {
    key: "l2",
    name: "Mineflied",
  },
  {
    key: "l3",
    name: "Hangman",
  },
  {
    key: "l4",
    name: "Compound Words",
  },
  {
    key: "l5",
    name: "Jeopardy",
  },
  {
    key: "l6",
    name: "Picture Reveal",
  },
];

export function ClassroomGames(props: IClassroomGamesProps) {
  return (
    <div>
      <p>Classroom Games</p>
      <ol>
        {IDEA_GAMES.map((item: ListItem) => (
          <li key={item.key}>
            <p>{item.name}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
