import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getmydetails = createAsyncThunk(
  "user/mydetails",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/myDetails"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const myDetailsSlice = createSlice({
  name: "myDetails",
  initialState: {
    status: "idle",
    error: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  extraReducers: (builder) => {
    builder.addCase(getmydetails.pending, (state) => {
      state.status = "loading";
      state.error = "null";
    });
    builder.addCase(getmydetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getmydetails.rejected, (state, action) => {
      state.status = "failed";

      state.error = action.payload;
    });
  },
});

export default myDetailsSlice.reducer;
