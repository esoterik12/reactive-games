// import * as React from "react";
// import classes from "./Memory.module.css";
// import { DUMMY_WORDS } from "./dummyWords";
// import { MemoryCard } from "./MemoryCard COPY";
// import { MemoryInput } from "../MemoryInput";

// export interface IMemoryProps {}

// export interface wordsData {
//   [key: string]: {
//     word: string;
//     number: number;
//     visible: boolean;
//     completed: boolean;
//   };
// }

// export function Memory(props: IMemoryProps) {
//   const [wordsData, setWordsData] = React.useState<wordsData>({}); // holds all game data
//   const [visibleWords, setVisibleWords] = React.useState<any>([]); // holds the current words in play
//   const [shuffledWords, setShuffledWords] = React.useState<string[]>([]);
//   const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

//   // adds words to the visibleWords array
//   function addVisible(word: string) {
//     setVisibleWords((prevVisibleWords: []) => [
//       ...prevVisibleWords,
//       wordsData[word],
//     ]);
//   }

//   React.useEffect(() => {
//     console.log("wordsData updated in useEffect: ", wordsData);
//   }, [wordsData]);

//   React.useEffect(() => {
//     // if the visibleWords has 2 words (ie 2 words selected)
//     if (visibleWords && visibleWords.length > 1) {
//       // ensures round clean up code only runs after 1 second
//       const timeout = setTimeout(() => {
//         const [firstWord, secondWord] = visibleWords;
//         // if wordObject numbers match indicating matching pair
//         if (firstWord.number === secondWord.number) {
//           console.log("Words match!");
//           setWordsData((prevWordsData) => ({
//             ...prevWordsData,
//             [firstWord.word]: {
//               ...prevWordsData[firstWord.word],
//               completed: true,
//             },
//             [secondWord.word]: {
//               ...prevWordsData[secondWord.word],
//               completed: true,
//             },
//           }));
//           setVisibleWords([]);
//         } else {
//           // resets the property visible to false of selected words
//           setWordsData((prevWordsData) => ({
//             ...prevWordsData,
//             [firstWord.word]: {
//               ...prevWordsData[firstWord.word],
//               visible: false,
//               completed: false,
//             },
//             [secondWord.word]: {
//               ...prevWordsData[secondWord.word],
//               visible: false,
//               completed: false,
//             },
//           }));
//           setVisibleWords([]);
//         }
//         // clears the currently visible words array
//       }, 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [visibleWords]);

//   React.useEffect(() => {
//     const wordsArray = Object.keys(wordsData);
//     const shuffledArray = [...wordsArray];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (1 + i));
//       [shuffledArray[i], shuffledArray[j]] = [
//         shuffledArray[j],
//         shuffledArray[i],
//       ];
//     }
//     setShuffledWords(shuffledArray);
//     console.log("Shuffled words: ", shuffledWords);
//   }, [isSubmitted]);

//   return (
//     <div className={classes.pageContainer}>
//       <h2>Play a Memory Game</h2>
//       <MemoryInput
//         setWordsData={setWordsData}
//         setIsSubmitted={setIsSubmitted}
//       />
//       <p>
//         This generator takes a sentence and outputs a cryptogram for players to
//         decode.
//       </p>
//       <div className={classes.memoryContainer}>
//         {shuffledWords.map((word, index) => (
//           <div key={index}>
//             <MemoryCard
//               word={word}
//               addVisible={addVisible}
//               visibleWords={visibleWords}
//               setWordsData={setWordsData}
//               wordsData={wordsData}
//               shuffledWords={shuffledWords}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
