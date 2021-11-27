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

const initialState = {
  user: {},
  token: null,
  loadings: {
    login: false,
  },
  errors: {
    login: "",
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadings.login = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
        } else {
          state.errors.login = action.payload.message;
          console.log(action.payload);
        }
        state.loadings.login = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadings.login = false;
        console.log(action.payload.response);
        state.errors.login = action.payload.response.data.message;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
