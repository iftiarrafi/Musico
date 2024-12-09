import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const bandProfile = createAsyncThunk(
  "band/profileBand",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/band/get-band-details"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const bandProfileSlice = createSlice({
  name: "Bandprofile",
  initialState: {
    band: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bandProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(bandProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.band = action.payload || null;
    });
    builder.addCase(bandProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default bandProfileSlice.reducer;
