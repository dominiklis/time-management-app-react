import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "../../utils/api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    const { login, password } = userData;
    try {
      const response = await apiCalls.users.login(login, password);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    const { name, email, password } = userData;
    try {
      const response = await apiCalls.users.register(name, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: {},
  token: null,
  loadings: {
    login: false,
    register: false,
  },
  errors: {
    login: "",
    register: "",
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loadings.login = true;
        state.errors.login = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
        } else {
          state.errors.login = action.payload.message;
        }
        state.loadings.login = false;
      })

      // register user
      .addCase(registerUser.pending, (state) => {
        state.loadings.register = true;
        state.errors.register = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
        } else {
          state.errors.register = action.payload.message;
        }
        state.loadings.register = false;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
