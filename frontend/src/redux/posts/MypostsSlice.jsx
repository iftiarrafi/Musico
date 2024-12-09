import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getmyposts = createAsyncThunk(
  "myposts/getmyposts",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/post/my-posts"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An unknown error has occured!"
      );
    }
  }
);

const mypostSlice = createSlice({
  name: "myposts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {
    clearmypostsSlice: (state) => {
      state.status = "idle";
      state.error = null;
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getmyposts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getmyposts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(getmyposts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearmypostsSlice } = mypostSlice.actions;
export default mypostSlice.reducer;
