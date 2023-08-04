import { createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./actions/fetchRepoData";
import { fetchContributers } from "./actions/fetchContributers";

const initialState = {
  githubRepoData: [],
  commitsData: [],
  contributorData: [],
  loading: false,
  error: null,
};

const githubRepoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepoData.fulfilled, (state, action) => {
        state.loading = false;
        state.githubRepoData = [
          ...state.githubRepoData,
          ...action.payload.items,
        ];
      })
      .addCase(fetchRepoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContributers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContributers.fulfilled, (state, action) => {
        state.contributorData = action.payload.contributersData;
        state.commitsData = action.payload.commitsData;
        console.log(state.contributorData, state.commitsData);
        if (state.commitsData.length > 0 && state.contributorData.length > 0) {
          state.loading = false;
        }
      })
      .addCase(fetchContributers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default githubRepoSlice.reducer;
