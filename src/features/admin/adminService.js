const axios = require("axios");

const API_URL = "https://juanbackend.onrender.com/admin/";

const adminLogin = async (data) => {
  const response = await axios.post(API_URL + "login", data);

  if (response.data) {
    localStorage.setItem("admin", response.data);
  }

  return response.data;
};

const addAdmin = async (data) => {
  const response = await axios.post(API_URL + "addAdmin", data);

  return response.data;
};

const getAdmin = async () => {
  const response = await axios.get(API_URL + "getAdmin");

  return response.data;
};

const getAllBookings = async () => {
  const response = await axios.get(API_URL + "getBooking");

  return response.data;
};

const getBookingsCount = async () => {
  const response = await axios.get(API_URL + "getBookingsCount");

  return response.data;
};

const editBooking = async (bookingID, BookingData) => {
  const response = await axios.put(
    API_URL + "updateBooking/" + bookingID,
    BookingData
  );

  return response.data;
};

const getAnnouncements = async () => {
  const response = await axios.get(API_URL + "getAnnounce");

  return response.data;
};

const updateAnnounce = async (announceId, announceText) => {
  const response = await axios.put(
    `${API_URL}updateAnnounce/${announceId}`,
    announceText
  );

  return response.data;
};

const getBookingToday = async () => {
  const response = await axios.get(API_URL + "getBookingToday");

  return response.data;
};

const getApprovedUsers = async () => {
  const response = await axios.get(API_URL + "getApprovedUsers");

  return response.data;
};

const getRejectedUsers = async () => {
  const response = await axios.get(API_URL + "getRejectedUsers");

  return response.data;
};

const getPendingUsers = async () => {
  const response = await axios.get(API_URL + "getpendingUsers");

  return response.data;
};

const countUser = async () => {
  const response = await axios.get(API_URL + "countUser");

  return response.data;
};

const countBookings = async () => {
  const response = await axios.get(API_URL + "countBookings");

  return response.data;
};

const adminService = {
  adminLogin,
  addAdmin,
  getAllBookings,
  getBookingsCount,
  editBooking,
  getAnnouncements,
  updateAnnounce,
  getBookingToday,
  getApprovedUsers,
  getRejectedUsers,
  getPendingUsers,
  countUser,
  countBookings,
};

export default adminService;
