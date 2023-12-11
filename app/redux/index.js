import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice";
import wordSearchSlice from "./wordSearch-slice";
import bingoSlice from "./bingo-slice";

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    wordSearch: wordSearchSlice.reducer,
    bingo: bingoSlice.reducer,
  },
});

export default store;
