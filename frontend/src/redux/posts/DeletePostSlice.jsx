import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const deletePost = createAsyncThunk(
  "deletepostslice/deletePost",
  async ({ postId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/post/delete-post/${postId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An unknown error occured"
      );
    }
  }
);

const deletePostSlice = createSlice({
  name: "deletepostslice",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {
    cleardeleteslice: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default deletePostSlice.reducer;
