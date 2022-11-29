import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const user = JSON.parse(localStorage.getItem("user"));
const bookingData = localStorage.getItem("booking") || {};
// const isLoggedIn = Boolean(user);

const initialState = {
  user,
  booking: [],
  userBooking: bookingData,
  userLoading: false,
  userError: false,
  userSuccess: false,
  userMessage: "",
  bookingError: false,
  bookingSuccess: false,
  bookingLoading: false,
  bookingMessage: "",
  // isLoggedIn,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userdata, thunkAPI) => {
    try {
      const response = await userService.registerUser(userdata);
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userdata, thunkAPI) => {
    try {
      const response = await userService.loginUser(userdata);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk("user/logout", async () => {
  return await userService.logOutUser();
});

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await userService.getUser();
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addBooking = createAsyncThunk(
  "user/addbooking",
  async (bookingdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await userService.addBooking(bookingdata, token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserBooking = createAsyncThunk(
  "user/userBooking",
  async (_, thunkAPI) => {
    try {
      return await userService.userBooking();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userError = null;
      state.userSuccess = false;
      state.userBooking = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
        state.userSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
        state.userSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(addBooking.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.booking = action.payload;
        state.bookingSuccess = true;
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = true;
        state.bookingMessage = action.payload;
      })
      .addCase(getUserBooking.fulfilled, (state, action) => {
        state.userBooking = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { userReset } = userSlice.actions;
export const getBooking = (state) => state.user.userBooking;
export default userSlice.reducer;
