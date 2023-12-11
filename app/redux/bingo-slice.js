import { createSlice } from "@reduxjs/toolkit";

const bingoSlice = createSlice({
  name: "bingo",
  initialState: {
    title: "",
    words: [],
    changed: false,
    bingoArray: [],
  },
  reducers: {
    clearAll(state) {
      state.title = "";
      state.words = [];
      state.changed = false;
      state.bingoArray = [];
    },
    sendWords(state, action) {
      const { title, wordsArray, bingoArray } = action.payload;
      state.title = title;
      state.changed = true;
      state.words = wordsArray;
      state.bingoArray = bingoArray;
    },
  },
});

export const bingoActions = bingoSlice.actions;

export default bingoSlice;
