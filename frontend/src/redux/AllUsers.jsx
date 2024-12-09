import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllUsers = createAsyncThunk(
  "user/allUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/all-users"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respone.data.message);
    }
  }
);

const allUserSlice = createSlice({
  name: "allbands",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload || [];
      state.error = null;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default allUserSlice.reducer;
