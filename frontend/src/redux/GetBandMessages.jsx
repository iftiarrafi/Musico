import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getBandMessage = createAsyncThunk(
  "message/getBandmessage",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/message/band/get-messages"
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

const getBandMessageSlice = createSlice({
  name: "message",
  initialState: {
    status: "idle",
    error: null,
    received_messages: [],
    sent_messages: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBandMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBandMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.received_messages = action.payload.received_messages || [];
        state.sent_messages = action.payload.sent_messages || [];
      })
      .addCase(getBandMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getBandMessageSlice.reducer;
