import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const adminRegister = createAsyncThunk(
  "adminAuth/Register",
  async (formdata, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/admin/register",
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
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const initialState = {
  admin: null,
  status: "idle",
  error: null,
};
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(adminRegister.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(adminRegister.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(adminRegister.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default adminAuthSlice.reducer;
