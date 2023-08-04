import { configureStore } from "@reduxjs/toolkit";
import githubRepoSlice from "./githubRepoSlice";

const store = configureStore({
  reducer: {
    githubRepos: githubRepoSlice,
  },
});

export default store;
