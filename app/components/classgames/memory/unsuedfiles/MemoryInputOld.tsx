// import * as React from "react";
// import classes from "./MemoryInput.module.css";
// import { wordsData } from "./Memory";

// export interface IMemoryInputProps {
//   setWordsData: React.Dispatch<React.SetStateAction<wordsData>>;
//   setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
// }

// export function MemoryInput(props: IMemoryInputProps) {
//   const [memoryData, setMemoryData] = React.useState<wordsData>({});

//   const pairArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

//   function handleChange(
//     event: React.ChangeEvent<HTMLInputElement>,
//     wordKey: string,
//     index: number,
//     pairNumber: number
//   ) {
//     setMemoryData((prevMemoryData) => ({
//       ...prevMemoryData,
//       [wordKey]: {
//         ...prevMemoryData[wordKey],
//         word: event.target.value,
//         number: pairNumber,
//         visible: false,
//         completed: false,
//       },
//     }));
//   }

//   function handleSubmit() {
//     props.setWordsData(memoryData);
//     props.setIsSubmitted(true)
//     console.log(memoryData)
//   }


//   return (
//     <>
//       <div className={classes.inputContainer}>
//         {pairArray.map((pairNumber, index) => {
//           const wordKey = `word${index}`;
//           return (
//             <div className={classes.inputItem}>
//               <input
//                 key={`Pair${pairNumber}-Idx${index}`}
//                 type="text"
//                 value={memoryData[wordKey]?.word || ""}
//                 onChange={(event) =>
//                   handleChange(event, wordKey, index, pairNumber)
//                 }
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div className={classes.buttonContainer}>
//         <button>Reset</button>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </>
//   );
// }
