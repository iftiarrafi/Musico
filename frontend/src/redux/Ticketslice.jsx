import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const buyticket = createAsyncThunk(
  "ticket/buyticket",
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/ticket/buy-ticket/${eventId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const mytickets = createAsyncThunk(
  "ticket/mytickets",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/ticket/my-tickets"
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    status: "idle",
    ticket: [],
    error: null,
  },
  reducers: {
    clearTicketState: (state) => {
      state.status = "idle";
      state.error = null;
      state.ticket = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyticket.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(buyticket.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.ticket.push(action.payload.ticket);
      })
      .addCase(buyticket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /*My tickets*/
      .addCase(mytickets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(mytickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ticket = action.payload || [];
        state.error = null;
      })
      .addCase(mytickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { clearTicketState } = ticketSlice.actions;
export default ticketSlice.reducer;
