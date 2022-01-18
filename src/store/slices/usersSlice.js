import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "../../utils/api";

export const userTokenKey = "user-token";

const saveTokenLocalStorage = (token) => {
  localStorage.setItem(userTokenKey, token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(userTokenKey);
};

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

export const renewToken = createAsyncThunk(
  "users/renewToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCalls.users.renew();
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
    renew: false,
  },
  errors: {
    login: "",
    register: "",
    renew: "",
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      removeTokenFromLocalStorage();
      state.token = null;
      state.user = {};
    },
  },
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
          saveTokenLocalStorage(action.payload.data.token);
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
          saveTokenLocalStorage(action.payload.data.token);
        } else {
          state.errors.register = action.payload.message;
        }
        state.loadings.register = false;
      })

      // renew token
      .addCase(renewToken.pending, (state) => {
        state.loadings.renew = true;
        state.errors.renew = "";
      })
      .addCase(renewToken.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          saveTokenLocalStorage(action.payload.data.token);
        } else {
          state.errors.renew = action.payload.message;
          removeTokenFromLocalStorage();
        }
        state.loadings.renew = false;
      });
  },
});

export const { logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
