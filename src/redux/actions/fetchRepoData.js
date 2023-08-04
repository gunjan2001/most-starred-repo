import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment/moment";

export const fetchRepoData = createAsyncThunk(
  "apiData/fetchRepos",
  async (pageNumber) => {
    try {
      const DATE_30_DAYS_BEFORE = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
      const apiData = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${pageNumber}`
      );
      return apiData.data;
    } catch (err) {
      return err.message;
    }
  }
);
