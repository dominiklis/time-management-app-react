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

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData, { rejectWithValue }) => {
    const { projectId, projectName, projectDescription } = projectData;

    try {
      const response = await apiCalls.projects.update(
        projectId,
        projectName,
        projectDescription
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await apiCalls.projects.delete(projectId);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// sharing
export const shareProject = createAsyncThunk(
  "projects/shareProject",
  async (sharingData, { rejectWithValue }) => {
    const {
      projectId,
      login,
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    } = sharingData;

    try {
      const response = await apiCalls.projects.shareProject(
        projectId,
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
  "projects/editSharing",
  async (sharingData, { rejectWithValue }) => {
    const {
      projectId,
      userId,
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    } = sharingData;

    try {
      const response = await apiCalls.projects.editSharing(
        userId,
        projectId,
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
  "projects/deleteSharing",
  async (sharingData, { rejectWithValue }) => {
    const { userId, projectId } = sharingData;

    try {
      const response = await apiCalls.projects.deleteSharing(userId, projectId);

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
    shareProject: false,
    sharing: {
      create: false,
      edit: false,
    },
  },
  errors: {
    gettingProjects: "",
    creatingProject: "",
    editProject: "",
    deleteProject: "",
    shareProject: "",
    sharing: {
      create: "",
      edit: "",
    },
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
      })

      .addCase(updateProject.pending, (state) => {
        state.loadings.editProject = true;
        state.errors.editProject = "";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        if (action.payload.success && state.projectsLoaded) {
          const updatedProjects = state.projects.map((project) => {
            if (project.projectId === action.payload.data.projectId) {
              project.projectName = action.payload.data.projectName;
              project.projectDescription =
                action.payload.data.projectDescription;
            }

            return project;
          });

          state.projects = updatedProjects;
        }

        state.loadings.editProject = false;
      })

      .addCase(deleteProject.pending, (state) => {
        state.loadings.deleteProject = true;
        state.errors.deleteProject = "";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        if (action.payload.success) {
          let newProjects = [];

          if (state.projectsLoaded) {
            newProjects = state.projects.filter(
              (project) => project.projectId !== action.payload.data.projectId
            );
          }

          state.projects = newProjects;
        }

        state.loadings.deleteProject = false;
      })

      // share projects
      .addCase(shareProject.pending, (state) => {
        state.loadings.sharing.create = true;
        state.errors.sharing.create = "";
      })
      .addCase(shareProject.fulfilled, (state, action) => {
        if (action.payload.success && state.projectsLoaded) {
          const projectIndex = state.projects.findIndex(
            (project) => project.projectId === action.payload.data.projectId
          );

          if (!state.projects[projectIndex].users)
            state.projects[projectIndex].users = [];

          state.projects[projectIndex].users.push(action.payload.data);
        } else {
          state.errors.sharing.create = action.payload.message;
        }

        state.loadings.sharing.create = false;
      })

      .addCase(editSharing.pending, (state) => {
        state.loadings.sharing.edit = true;
        state.errors.sharing.edit = "";
      })
      .addCase(editSharing.fulfilled, (state, action) => {
        if (action.payload.success && state.projectsLoaded) {
          const projectIndex = state.projects.findIndex(
            (project) => project.projectId === action.payload.data.projectId
          );

          const updatedUsers = state.projects[projectIndex].users.map(
            (user) => {
              if (user.userId === action.payload.data.userId) {
                user.canShare = action.payload.data.canShare;
                user.canChangePermissions =
                  action.payload.data.canChangePermissions;
                user.canEdit = action.payload.data.canEdit;
                user.canDelete = action.payload.data.canDelete;
              }

              return user;
            }
          );

          state.projects[projectIndex].users = updatedUsers;
        }

        state.loadings.sharing.edit = false;
      })

      .addCase(deleteSharing.pending, (state) => {
        state.loadings.sharing.deleteSharing = true;
        state.errors.sharing.deleteSharing = "";
      })
      .addCase(deleteSharing.fulfilled, (state, action) => {
        if (action.payload.success && state.projectsLoaded) {
          const projectIndex = state.projects.findIndex(
            (project) => project.projectId === action.payload.data.projectId
          );

          const updatedUsers = state.projects[projectIndex].users.filter(
            (user) => user.userId !== action.payload.data.userId
          );

          state.projects[projectIndex].users = updatedUsers;
        }

        state.loadings.sharing.deleteSharing = false;
      });
  },
});

// export const {} = projectsSlice.actions;

export default projectsSlice.reducer;
