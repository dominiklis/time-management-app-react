import { configureStore } from "@reduxjs/toolkit";

import {
  appReducer,
  usersReducer,
  tasksReducer,
  projectsReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: usersReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});
