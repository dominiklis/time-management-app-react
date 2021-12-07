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

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiCalls.tasks.delete(taskId);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addStep = createAsyncThunk(
  "tasks/addStep",
  async (stepData, { rejectWithValue }) => {
    const { taskId, stepText } = stepData;

    try {
      const response = await apiCalls.tasks.addStep(taskId, stepText);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStep = createAsyncThunk(
  "tasks/updateStep",
  async (stepData, { rejectWithValue }) => {
    const { stepId, taskId, stepText, stepCompleted } = stepData;

    try {
      const response = await apiCalls.tasks.updateStep(
        stepId,
        taskId,
        stepText,
        stepCompleted
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStep = createAsyncThunk(
  "tasks/deleteStep",
  async (stepData, { rejectWithValue }) => {
    const { stepId, taskId } = stepData;

    try {
      const response = await apiCalls.tasks.deleteStep(stepId, taskId);

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
    deleteTask: false,
    addStep: false,
    updateStep: false,
    deleteStep: false,
  },
  errors: {
    gettingTasks: "",
    createTask: "",
    updateTask: "",
    deleteTask: "",
    addStep: "",
    updateStep: "",
    deleteStep: "",
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
      })

      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.loadings.deleteTask = true;
        state.errors.deleteTask = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload.success) {
          let newTasks = [];

          if (state.tasksLoaded) {
            newTasks = state.tasks = state.tasks.filter(
              (task) => task.taskId !== action.payload.data.taskId
            );
          }

          state.tasks = newTasks;
        }

        state.loadings.deleteTask = false;
      })

      // add step
      .addCase(addStep.pending, (state) => {
        state.loadings.addStep = true;
        state.errors.addStep = "";
      })
      .addCase(addStep.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          if (!state.tasks[taskIndex].steps) state.tasks[taskIndex].steps = [];

          state.tasks[taskIndex].steps.push(action.payload.data);
        }

        state.loadings.addStep = false;
      })

      // update step
      .addCase(updateStep.pending, (state) => {
        state.loadings.updateStep = true;
        state.errors.updateStep = "";
      })
      .addCase(updateStep.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          const updatedSteps = state.tasks[taskIndex].steps.map((step) => {
            if (step.stepId === action.payload.data.stepId) {
              step.stepText = action.payload.data.stepText;
              step.stepCompleted = action.payload.data.stepCompleted;
            }

            return step;
          });

          state.tasks[taskIndex].steps = updatedSteps;
        }

        state.loadings.updateStep = false;
      })

      // delete steps
      .addCase(deleteStep.pending, (state) => {
        state.loadings.deleteStep = true;
        state.errors.deleteStep = "";
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          const updatedSteps = state.tasks[taskIndex].steps.filter(
            (step) => step.stepId !== action.payload.data.stepId
          );

          state.tasks[taskIndex].steps = updatedSteps;
        }

        state.loadings.deleteStep = false;
      });
  },
});

// export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
