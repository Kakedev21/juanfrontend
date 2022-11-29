import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  bookings: [],
  totalBookings: null,
  announcements: "",
  adminLoading: false,
  adminError: "",
  adminSuccess: false,
  bookingsLoading: false,
  bookingsError: "",
  bookingsSuccess: false,
  totalBookingsLoading: false,
  totalBookingsError: "",
  totalBookingsSuccess: false,
  announcementsLoading: false,
  announcementsSuccess: false,
  announcementsError: "",
  bookingToday: 0,
  approved: [],
  rejected: [],
  pendings: [],
  totalUsers: 0,
  totalBookingsCount: 0,
};

export const getAdmin = createAsyncThunk(
  "admin/getAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAdmin();
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminLogin = createAsyncThunk("admin/adminLogin", async (data) => {
  try {
    const response = await adminService.adminLogin(data);
    return response;
  } catch (error) {
    const message =
      (error.response.data && error.response.data.message && error.response) ||
      error.message ||
      error.toString();
    return message;
  }
});

export const addAdmin = createAsyncThunk("admin/addAdmin", async (data) => {
  try {
    const response = await adminService.addAdmin(data);
    return response;
  } catch (error) {
    const message =
      (error.response.data && error.response.data.message && error.response) ||
      error.message ||
      error.toString();
    return message;
  }
});

export const getAllBookings = createAsyncThunk(
  "admin/getBookings",
  async () => {
    try {
      const response = await adminService.getAllBookings();
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      return message;
    }
  }
);

export const getBookingsCount = createAsyncThunk(
  "admin/getBookingsCount",
  async () => {
    try {
      const response = await adminService.getBookingsCount();
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      return message;
    }
  }
);

export const editBooking = createAsyncThunk(
  "admin/editBooking",
  async (data, thunkAPI) => {
    try {
      const response = await adminService.editBooking(data.id, {
        status: data.status,
      });
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAnnouncements = createAsyncThunk(
  "admin/getAnnouncement",
  async () => {
    try {
      const response = await adminService.getAnnouncements();
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      return message;
    }
  }
);

export const updateAnnounce = createAsyncThunk(
  "admin/updateAnnounce",
  async (announceData, thunkAPI) => {
    try {
      const response = await adminService.updateAnnounce(announceData.id, {
        text: announceData.text,
      });
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBookingToday = createAsyncThunk(
  "admin/getBookingToday",
  async () => {
    try {
      const response = await adminService.getBookingToday();
      return response;
    } catch (error) {
      const message =
        (error.response.data &&
          error.response.data.message &&
          error.response) ||
        error.message ||
        error.toString();
      return message;
    }
  }
);

export const countUser = createAsyncThunk("admin/totalUsers", async () => {
  try {
    const response = await adminService.countUser();
    return response;
  } catch (error) {
    const message =
      (error.response.data && error.response.data.message && error.response) ||
      error.message ||
      error.toString();
    return message;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminReset: (state) => {
      state.admin = null;
      state.adminLoading = false;
      state.adminError = null;
      state.adminSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state, action) => {
        state.adminLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.adminLoading = false;
        state.adminSuccess = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      .addCase(addAdmin.pending, (state, action) => {
        state.adminLoading = true;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.adminLoading = false;
        state.adminSuccess = true;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      .addCase(getAllBookings.pending, (state, action) => {
        state.bookingsLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.bookingsLoading = false;
        state.totalBookingsError = action.payload;
      })
      .addCase(getBookingsCount.pending, (state, action) => {
        state.totalBookingsLoading = true;
      })
      .addCase(getBookingsCount.fulfilled, (state, action) => {
        state.totalBookingsLoading = false;
        state.totalBookings = action.payload;
      })
      .addCase(getBookingsCount.rejected, (state, action) => {
        state.totalBookingsLoading = false;
        state.totalBookingsLoading = action.payload;
      })
      .addCase(editBooking.fulfilled, (state, action) => {
        state.adminLoading = false;

        let { id, status } = action.payload;

        for (let i = 0; i < state.bookings.length; i++) {
          if (state.bookings[i]._id === id) {
            state.bookings[i].status = status;
          }
        }

        state.bookings = [...state.bookings];
      })
      .addCase(getAnnouncements.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })
      .addCase(updateAnnounce.pending, (state) => {
        state.announcementsLoading = true;
      })
      .addCase(updateAnnounce.fulfilled, (state, action) => {
        state.announcementsLoading = false;
        state.announcements = action.payload;
        state.announcementsSuccess = true;
      })
      .addCase(updateAnnounce.rejected, (state, action) => {
        state.announcementsLoading = false;
        state.announcementsError = action.payload;
      })
      .addCase(getBookingToday.fulfilled, (state, action) => {
        state.bookingToday = action.payload;
      })
      .addCase(countUser.fulfilled, (state, action) => {
        state.totalUsers = action.payload;
      });
  },
});

export const { adminReset } = adminSlice.actions;
export default adminSlice.reducer;
