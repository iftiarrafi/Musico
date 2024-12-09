import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const bandSendMessage = createAsyncThunk(
  "message/send",
  async ({ userId, text }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/message/band/send-message/${userId}`,
        { text }
      );
      return response.data;
    } catch (error) {
      return (
        thunkAPI.rejectWithValue(error.response?.data?.message) ||
        "Something is wrong."
      );
    }
  }
);

const bandSendMessageSlice = createSlice({
  name: "message",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {
    clearMessageStateBand: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bandSendMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bandSendMessage.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(bandSendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearMessageStateBand } = bandSendMessageSlice.actions;
export default bandSendMessageSlice.reducer;
