import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialLoad: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialLoad: (state, action) => {
      state.initialLoad = action.payload;
    },
  },
});

export const { setInitialLoad } = appSlice.actions;

export default appSlice.reducer;
