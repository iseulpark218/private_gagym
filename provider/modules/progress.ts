import { createSlice } from "@reduxjs/toolkit";

interface ProgressState {
  status: boolean;
}

const initialState: ProgressState = {
  status: false,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    startProgress: (state) => {
      state.status = true;
    },
    endProgress: (state) => {
      state.status = false;
    },
  },
});

export const { startProgress, endProgress } = progressSlice.actions;
export default progressSlice.reducer;
