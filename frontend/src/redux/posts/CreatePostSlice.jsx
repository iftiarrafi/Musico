import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const createPost = createAsyncThunk(
  "myDetails/createPost",
  async (postdata, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/post/create-post",
        postdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

const createPostSlice = createSlice({
  name: "myDetails",
  initialState: {
    status: "idle",
    error: null,
    post: {},
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.post = action.payload.post;
      state.error = null;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default createPostSlice.reducer;
