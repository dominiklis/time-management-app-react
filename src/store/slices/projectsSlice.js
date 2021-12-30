import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "../../utils/api";

// projects
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCalls.projects.get();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ projectName, projectDescription }, { rejectWithValue }) => {
    try {
      const response = await apiCalls.projects.create(
        projectName,
        projectDescription
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  projects: [],
  projectsLoaded: false,
  loadings: {
    gettingProjects: false,
    creatingProject: false,
    editProject: false,
    deleteProject: false,
  },
  errors: {
    gettingProjects: "",
    creatingProject: "",
    editProject: "",
    deleteProject: "",
  },
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loadings.gettingProjects = true;
        state.errors.gettingProjects = "";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.projects = action.payload.data;
        }
        state.loadings.gettingProjects = false;
        state.projectsLoaded = true;
      })

      .addCase(createProject.pending, (state) => {
        state.loadings.creatingProject = true;
        state.errors.creatingProject = "";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.projects.push(action.payload.data);
        }
        state.loadings.creatingProject = false;
      });
  },
});

// export const {} = projectsSlice.actions;

export default projectsSlice.reducer;
