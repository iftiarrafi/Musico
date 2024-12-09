import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getSingleUser = createAsyncThunk(
  "user/userDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/get-single/${id}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const getSingleUserSlice = createSlice({
  name: "getSingleUser",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload || null;
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default getSingleUserSlice.reducer;
