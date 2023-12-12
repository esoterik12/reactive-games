import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeslice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    modal: modalSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
