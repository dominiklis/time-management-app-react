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
    const { taskName, taskDescription, dateToComplete, startTime, endTime } =
      taskData;

    try {
      const response = await apiCalls.tasks.create(
        taskName,
        taskDescription,
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

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, { rejectWithValue }) => {
    const {
      taskId,
      taskName,
      taskDescription,
      taskCompleted,
      dateToComplete,
      startTime,
      endTime,
    } = taskData;

    try {
      const response = await apiCalls.tasks.update(
        taskId,
        taskName,
        taskDescription,
        dateToComplete,
        taskCompleted,
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
    updateTask: false,
  },
  errors: {
    gettingTasks: "",
    createTask: "",
    updateTask: "",
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
      })

      // update task
      .addCase(updateTask.pending, (state) => {
        state.loadings.updateTask = true;
        state.errors.updateTask = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const updatedTasks = state.tasks.map((task) => {
            if (task.taskId === action.payload.data.taskId) {
              task.taskName = action.payload.data.taskName;
              task.taskDescription = action.payload.data.taskDescription;
              task.taskCompleted = action.payload.data.taskCompleted;
              task.createdAt = action.payload.data.createdAt;
              task.completedAt = action.payload.data.completedAt;
              task.dateToComplete = action.payload.data.dateToComplete;
              task.startTime = action.payload.data.startTime;
              task.endTime = action.payload.data.endTime;
            }

            return task;
          });

          state.tasks = updatedTasks;
        }

        state.loadings.updateTask = false;
      });
  },
});

// export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
