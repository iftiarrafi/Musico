import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/event/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An unknown error occurred"
      );
    }
  }
);

const initialState = {
  event: [],
  status: "idle",
  error: null,
};

const createEventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* creating event */
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event.push(action.payload.event);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default createEventSlice.reducer;
