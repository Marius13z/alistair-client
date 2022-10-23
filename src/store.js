import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";
import postsReducer from "./features/posts-slice";

export const store = configureStore({
  reducer: { user: userReducer, posts: postsReducer },
});
