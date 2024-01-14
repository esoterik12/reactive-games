import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeslice";
import modalSlice from "./modalSlice";
import spotItSlice from "./spotitSlice";
import loadSlice from "./loadslice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    modal: modalSlice.reducer,
    spotIt: spotItSlice.reducer,
    load: loadSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
