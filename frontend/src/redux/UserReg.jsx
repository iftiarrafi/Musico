import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const userRegistration = createAsyncThunk(
  "user/Register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/register",
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
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {
    clearUserReg: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegistration.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(userRegistration.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearUserReg } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
