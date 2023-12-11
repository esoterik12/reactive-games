import { createSlice } from "@reduxjs/toolkit";

const wordSearchSlice = createSlice({
  name: "wordSearch",
  initialState: {
    title: "",
    words: [],
    changed: false,
    wordSearch: [],
  },
  reducers: {
    clearAll(state) {
      state.title = "";
      state.words = [];
      state.changed = false;
      state.wordSearch = []
    },
    sendWords(state, action) {
      const { title, words, wordSearch } = action.payload;
      state.title = title;
      state.changed = true;
      const wordsArray = words.split(", ")
      state.words = wordsArray;
      state.wordSearch = wordSearch
    },
  },
});

export const wordSearchActions = wordSearchSlice.actions;

export default wordSearchSlice;
