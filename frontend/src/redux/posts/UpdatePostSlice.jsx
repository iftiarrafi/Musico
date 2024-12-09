import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const updatepost = createAsyncThunk(
  "updatepostSlice/updatepost",
  async ({ id, formdata }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/post/update-post/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

const updatepostSlice = createSlice({
  name: "updatepostSlice",
  initialState: {
    status: "idle",
    error: null,
    post: {},
  },
  reducers: {
    clearUpdateSliceState: (state) => {
      state.status = "idle";
      state.error = null;
      state.post = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatepost.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updatepost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.post = action.payload.post;
    });
    builder.addCase(updatepost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearUpdateSliceState } = updatepostSlice.actions;
export default updatepostSlice.reducer;
