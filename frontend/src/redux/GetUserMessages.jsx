import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getUserMessage = createAsyncThunk(
  "message/getUsermessage",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/message/user/get-messages"
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

const getUserMessageSlice = createSlice({
  name: "message",
  initialState: {
    status: "idle",
    error: null,
    received_messages: [],
    sent_messages: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.received_messages = action.payload.received_messages || [];
        state.sent_messages = action.payload.sent_messages || [];
      })
      .addCase(getUserMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getUserMessageSlice.reducer;
