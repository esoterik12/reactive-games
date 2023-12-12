import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ThemeState {
  theme: string;
}

const initialThemeState: ThemeState = { theme: "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.theme === "light"
        ? (state.theme = "dark")
        : (state.theme = "light");
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice;
