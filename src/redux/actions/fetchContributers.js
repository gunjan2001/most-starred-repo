import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContributers = createAsyncThunk(
  "apiData/fetchContributers",
  async ({ owner, repo }) => {
    try {
      const responseContributers = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
        {
          headers: {
            Authorization: import.meta.env.GITHUB_ACCESS_TOKEN,
          },
        }
      );
      const responseCommits = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
        {
          headers: {
            Authorization: import.meta.env.GITHUB_ACCESS_TOKEN,
          },
        }
      );
      const contributersData = responseContributers.data;
      const commitsData = responseCommits.data;
      console.log("contibuters: ", contributersData, "commits: ", commitsData);
      return { commitsData, contributersData };
    } catch (err) {
      return err.message;
    }
  }
);
