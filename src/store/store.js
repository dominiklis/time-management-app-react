import { configureStore } from "@reduxjs/toolkit";

import { usersReducer } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
