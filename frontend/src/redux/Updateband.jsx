import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const updateBand = createAsyncThunk(
  "band/updateBand",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/band/update-band-profile",
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const updateBandSlice = createSlice({
  name: "updateBandprofile",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {
    clearUpdatingState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBand.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateBand.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateBand.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearUpdatingState } = updateBandSlice.actions;
export default updateBandSlice.reducer;
