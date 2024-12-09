import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ formdata, eventId }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/event/update-event/${eventId}`,
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

const updateEventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearUpdateStates: (state) => {
      state.events = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* Update event */
      .addCase(updateEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUpdateStates } = updateEventSlice.actions;
export default updateEventSlice.reducer;
