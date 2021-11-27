import { configureStore } from "@reduxjs/toolkit";

import { usersReducer, appReducer } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    app: appReducer,
  },
});
