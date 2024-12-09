import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const loginBand = createAsyncThunk(
  "auth/bandLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/band/login",
        { email, password }
      );
      const bandToken = response.data.bandToken;
      const band = response.data.band;
      if (bandToken && band) {
        localStorage.setItem("bandToken", bandToken);
        localStorage.setItem("band", JSON.stringify(band));
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "an unknown error occured"
      );
    }
  }
);

export const logoutBand = createAsyncThunk(
  "auth/bandLogout",
  async (_, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/api/v1/band/logout");
      localStorage.removeItem("bandToken");
      localStorage.removeItem("band");
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An unknown error occurred"
      );
    }
  }
);

const initialState = {
  band: localStorage.getItem("band")
    ? JSON.parse(localStorage.getItem("band"))
    : null,
  token: localStorage.getItem("bandToken") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.band = null;
      state.bandToken = null;
      localStorage.removeItem("bandToken");
      localStorage.removeItem("band");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginBand.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginBand.fulfilled, (state, action) => {
        state.band = action.payload.band;
        state.token = action.payload.bandToken;
        state.status = "succeeded";
      })
      .addCase(loginBand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutBand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutBand.fulfilled, (state) => {
        state.status = "succeeded";
        state.band = null;
        state.token = null;
        localStorage.removeItem("bandToken");
        localStorage.removeItem("band");
      })
      .addCase(logoutBand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
