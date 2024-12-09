import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllBands = createAsyncThunk(
  "band/allBands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/band/all-bands"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respone.data.message);
    }
  }
);

const allBandsSlice = createSlice({
  name: "allbands",
  initialState: {
    bands: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBands.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllBands.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.bands = action.payload || [];
      state.error = null;
    });
    builder.addCase(fetchAllBands.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default allBandsSlice.reducer;
