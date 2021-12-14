import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "../../utils/api";

// tasks
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiCalls.tasks.get(params);

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

// steps
export const addStep = createAsyncThunk(
  "tasks/addStep",
  async (stepData, { rejectWithValue }) => {
    const { taskId, stepText, position } = stepData;

    try {
      const response = await apiCalls.tasks.addStep(taskId, stepText, position);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStep = createAsyncThunk(
  "tasks/updateStep",
  async (stepData, { rejectWithValue }) => {
    const { stepId, taskId, stepText, stepCompleted, position } = stepData;

    try {
      const response = await apiCalls.tasks.updateStep(
        stepId,
        taskId,
        stepText,
        stepCompleted,
        position
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

export const reorganizeStepsOrder = createAsyncThunk(
  "tasks/reorganizeStepsOrder",
  async (stepsData, { rejectWithValue }) => {
    const { taskId, steps } = stepsData;

    try {
      const response = await apiCalls.tasks.updateMultipleSteps(taskId, steps);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// sharing
export const shareTask = createAsyncThunk(
  "tasks/shareTask",
  async (sharingData, { rejectWithValue }) => {
    const {
      taskId,
      login,
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    } = sharingData;

    try {
      const response = await apiCalls.tasks.shareTask(
        taskId,
        login,
        canShare,
        canChangePermissions,
        canEdit,
        canDelete
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editSharing = createAsyncThunk(
  "tasks/editSharing",
  async (sharingData, { rejectWithValue }) => {
    const {
      taskId,
      userId,
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    } = sharingData;

    try {
      const response = await apiCalls.tasks.editSharing(
        taskId,
        userId,
        canShare,
        canChangePermissions,
        canEdit,
        canDelete
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSharing = createAsyncThunk(
  "tasks/deleteSharing",
  async (sharingData, { rejectWithValue }) => {
    const { taskId, userId } = sharingData;

    try {
      const response = await apiCalls.tasks.deleteSharing(taskId, userId);

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
    tasks: {
      gettingTasks: false,
      createTask: false,
      updateTask: false,
      deleteTask: false,
    },
    steps: {
      addStep: false,
      updateStep: false,
      deleteStep: false,
      updateMultipleSteps: false,
    },
    sharing: {
      sharingTask: false,
      editingSharing: false,
      deleteSharing: false,
    },
  },
  errors: {
    tasks: {
      gettingTasks: "",
      createTask: "",
      updateTask: "",
      deleteTask: "",
    },
    steps: {
      addStep: "",
      updateStep: "",
      deleteStep: "",
      updateMultipleSteps: "",
    },
    sharing: {
      sharingTask: "",
      editingSharing: "",
      deleteSharing: "",
    },
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStepsForTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        steps: action.payload.steps,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // getting tasks
      .addCase(getTasks.pending, (state) => {
        state.loadings.tasks.gettingTasks = true;
        state.errors.tasks.gettingTasks = "";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.tasks = action.payload.data;
        }

        state.loadings.tasks.gettingTasks = false;
        state.tasksLoaded = true;
      })

      // create task
      .addCase(createTask.pending, (state) => {
        state.loadings.tasks.createTask = true;
        state.errors.tasks.createTask = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (state.tasksLoaded) {
            state.tasks = [...state.tasks, action.payload.data];
          }
        }

        state.loadings.tasks.createTask = false;
        state.tasksLoaded = true;
      })

      // update task
      .addCase(updateTask.pending, (state) => {
        state.loadings.tasks.updateTask = true;
        state.errors.tasks.updateTask = "";
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

        state.loadings.tasks.updateTask = false;
      })

      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.loadings.tasks.deleteTask = true;
        state.errors.tasks.deleteTask = "";
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

        state.loadings.tasks.deleteTask = false;
      })

      // add step
      .addCase(addStep.pending, (state) => {
        state.loadings.steps.addStep = true;
        state.errors.steps.addStep = "";
      })
      .addCase(addStep.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          if (!state.tasks[taskIndex].steps) state.tasks[taskIndex].steps = [];

          state.tasks[taskIndex].steps.push(action.payload.data);
        }

        state.loadings.steps.addStep = false;
      })

      // update step
      .addCase(updateStep.pending, (state) => {
        state.loadings.steps.updateStep = true;
        state.errors.steps.updateStep = "";
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

        state.loadings.steps.updateStep = false;
      })

      // update multiple tasks
      .addCase(reorganizeStepsOrder.pending, (state) => {
        state.loadings.steps.updateMultipleSteps = true;
        state.errors.steps.updateMultipleSteps = "";
      })
      .addCase(reorganizeStepsOrder.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data[0].taskId
          );

          state.tasks[taskIndex].steps = action.payload.data;
        } else {
          state.errors.steps.updateMultipleSteps = action.payload.data;
        }

        state.loadings.steps.updateMultipleSteps = false;
      })

      // delete steps
      .addCase(deleteStep.pending, (state) => {
        state.loadings.steps.deleteStep = true;
        state.errors.steps.deleteStep = "";
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

        state.loadings.steps.deleteStep = false;
      })

      // share tasks
      .addCase(shareTask.pending, (state) => {
        state.loadings.sharing.sharingTask = true;
        state.errors.sharing.sharingTask = "";
      })
      .addCase(shareTask.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          if (!state.tasks[taskIndex].users) state.tasks[taskIndex].users = [];

          state.tasks[taskIndex].users.push(action.payload.data);
        } else {
          state.errors.sharing.sharingTask = action.payload.message;
        }

        state.loadings.sharing.sharingTask = false;
      })

      .addCase(editSharing.pending, (state) => {
        state.loadings.sharing.editingSharing = true;
        state.errors.sharing.editingSharing = "";
      })
      .addCase(editSharing.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          const updatedUsers = state.tasks[taskIndex].users.map((user) => {
            if (user.userId === action.payload.data.userId) {
              user.canShare = action.payload.data.canShare;
              user.canChangePermissions =
                action.payload.data.canChangePermissions;
              user.canEdit = action.payload.data.canEdit;
              user.canDelete = action.payload.data.canDelete;
            }

            return user;
          });

          state.tasks[taskIndex].users = updatedUsers;
        }

        state.loadings.sharing.editingSharing = false;
      })

      .addCase(deleteSharing.pending, (state) => {
        state.loadings.sharing.deleteSharing = true;
        state.errors.sharing.deleteSharing = "";
      })
      .addCase(deleteSharing.fulfilled, (state, action) => {
        if (action.payload.success && state.tasksLoaded) {
          const taskIndex = state.tasks.findIndex(
            (task) => task.taskId === action.payload.data.taskId
          );

          const updatedUsers = state.tasks[taskIndex].users.filter(
            (user) => user.userId !== action.payload.data.userId
          );

          state.tasks[taskIndex].users = updatedUsers;
        }

        state.loadings.sharing.deleteSharing = false;
      });
  },
});

export const { setStepsForTask } = tasksSlice.actions;

export default tasksSlice.reducer;
