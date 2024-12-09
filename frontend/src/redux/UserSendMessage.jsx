import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const usersendmessage = createAsyncThunk(
  "message/sendToBand",
  async ({ bandId, text }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/message/user/send-message/${bandId}`,
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

const userMessage = createSlice({
  name: "message",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {
    clearMessageStateUser: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersendmessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(usersendmessage.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(usersendmessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearMessageStateUser } = userMessage.actions;
export default userMessage.reducer;
