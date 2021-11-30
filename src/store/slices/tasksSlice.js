import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "../../utils/api";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCalls.tasks.get();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    const { name, description, dateToComplete, startTime, endTime } = taskData;

    try {
      const response = await apiCalls.tasks.create(
        name,
        description,
        dateToComplete,
        startTime,
        endTime
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  tasks: [],
  tasksLoaded: false,
  loadings: {
    gettingTasks: false,
    createTask: false,
  },
  errors: {
    gettingTasks: "",
    createTask: "",
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getting tasks
      .addCase(getTasks.pending, (state) => {
        state.loadings.gettingTasks = true;
        state.errors.gettingTasks = "";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.tasks = action.payload.data;
        }

        state.loadings.gettingTasks = false;
        state.tasksLoaded = true;
      })

      // create task
      .addCase(createTask.pending, (state) => {
        state.loadings.createTask = true;
        state.errors.createTask = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (state.tasksLoaded) {
            state.tasks = [...state.tasks, action.payload.data];
          }
        }

        state.loadings.createTask = false;
        state.tasksLoaded = true;
      });
  },
});

// export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
