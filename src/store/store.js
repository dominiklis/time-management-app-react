import { configureStore } from "@reduxjs/toolkit";

import { appReducer, usersReducer, tasksReducer } from "./slices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});
