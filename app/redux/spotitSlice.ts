import { createSlice } from "@reduxjs/toolkit";

interface SpotItState {
  changed: boolean;
  words: string[];
  displayArray: string[]
}

const initialSpotItState: SpotItState = { changed: false, words: [], displayArray: [] };

const spotItSlice = createSlice({
  name: "spotIt",
  initialState: initialSpotItState,
  reducers: {
    setWords(state, action) {
      state.changed = true;
      state.words = action.payload;
    },
    resetWords(state) {
      state.changed = false;
      state.words = [];
      state.displayArray = [];
    },
    displayWords(state) {
      state.displayArray = prepareWords(state.words)
    },
  },
});

export const { setWords, resetWords, displayWords } = spotItSlice.actions;

export default spotItSlice;

function prepareWords(wordsArray: string[]) {
  const outputArray = [...wordsArray];
  const randomIndex = Math.floor(Math.random() * outputArray.length);
  console.log("randomIndex: ", randomIndex);
  const duplicatedWord = outputArray[randomIndex];
  outputArray.push(duplicatedWord);

  for (let i = 0; i < 20; i++) {
    outputArray.push(" ");
  }

  const shuffledArray = shuffleArray(outputArray)

  return shuffledArray;
}

function shuffleArray(wordsArray: string[]) {
  const outputArray = [...wordsArray];
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
}
