import axios from "axios";

const API_URL = "https://juanbackend.onrender.com/user/";

const registerUser = async (userdata) => {
  try {
    const response = await axios.post(API_URL + "register", userdata);

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const loginUser = async (userdata) => {
  const response = await axios.post(API_URL + "login", userdata, {
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logOutUser = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("booking");
};

//add booking
const addBooking = async (bookingdata, token) => {
  const response = await axios.post(API_URL + "addbooking", bookingdata);

  return response.data;
};

const userBooking = async () => {
  const response = await axios.get(API_URL + "getUserBooking");
  localStorage.setItem("booking", JSON.stringify(response.data));
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

const userService = {
  registerUser,
  loginUser,
  addBooking,
  logOutUser,
  userBooking,
  getUser,
};

export default userService;
