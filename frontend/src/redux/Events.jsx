import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const allmyevents = createAsyncThunk(
  "event/myevents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/event/my-events"
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "No internet available"
      );
    }
  }
);

export const allEvents = createAsyncThunk(
  "event/allEvents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/event/all-events"
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "No internet available"
      );
    }
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(allEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload.events || [];
      })
      .addCase(allEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      /* my events */
      .addCase(allmyevents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allmyevents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload.events || [];
      })
      .addCase(allmyevents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
