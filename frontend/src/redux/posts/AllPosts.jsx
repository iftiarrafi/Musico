import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getallposts = createAsyncThunk(
  "allposts/allposts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/post/all-posts")
      return response.data
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An unknown error has occured!"
      );
    }
  }
);

const allpostSlice = createSlice({
  name: "allposts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {
    clearallpostslice: (state) => {
      state.status = "idle";
      state.error = null;
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getallposts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getallposts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(getallposts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearallpostslice } = allpostSlice.actions;
export default allpostSlice.reducer;
