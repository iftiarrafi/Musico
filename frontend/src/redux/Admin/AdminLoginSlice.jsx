import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
  adminToken: localStorage.getItem("adminToken")
    ? JSON.parse(localStorage.getItem("adminToken"))
    : null,
  error: "null",
  status: "idle",
};

export const adminLogin = createAsyncThunk(
  "adminLogin/login",
  async (formData, thunkAPI) => {
    // console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/admin/login",
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      const adminToken = response.data.token;
      const admin = response.data.admin;
      console.log("token : " + adminToken);
      //console.log(admin);

      if (adminToken && admin) {
        localStorage.setItem("adminToken", JSON.stringify(adminToken));
        localStorage.setItem("admin", JSON.stringify(admin));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const adminLogout = createAsyncThunk(
  "adminLogin/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/admin/logout"
      );
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  clearAdminStates: (state) => {
    state.status = "idle";
    state.error = null;
    state.admin = null;
    state.adminToken = null;
  },

  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.admin = action.payload.admin;
      state.adminToken = action.payload.token;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    //logout

    builder.addCase(adminLogout.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(adminLogout.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
      state.admin = null;
      state.adminToken = null;
    });
    builder.addCase(adminLogout.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});
export const { clearAdminStates } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
