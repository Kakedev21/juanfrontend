import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  addBooking,
  logOutUser,
  getUserBooking,
  getUser,
  userReset,
  getBooking,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import BookingModal from "../components/BookingModal";
import { useState } from "react";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import moun1 from "../img/moun1.jpg";
import Footer from "../components/Footer";

const Booking = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUserBooked, setIsUserBooked] = useState(false);
  const [title, setTitle] = useState("Booking Form");
  const [bookingData, setBookingData] = useState({
    fullname: "",
    address: "",
    contact: "",
    email: "",
    companions: 0,
    arrival: "",
    departure: "",
  });
  const [booking] = useSelector(getBooking);
  const { fullname, address, contact, email, companions, arrival, departure } =
    bookingData;

  //redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setTimeout(() => {
    setTitle("Title Has Changed");
  }, 1000 * 5);

  const { user, userError } = useSelector((state) => state.user);

  const {
    bookingError,
    bookingSuccess,
    bookingLoading,
    bookingMessage,
    userBooking,
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setBookingData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      fullname,
      address,
      contact,
      email,
      companions,
      arrival,
      departure,
    };

    dispatch(addBooking(bookingData)); // add booking to db = database booking is true
    dispatch(getUserBooking()); // get user booking from db = databas booking is true
    setBookingData({
      fullname: "",
      address: "",
      contact: "",
      email: "",
      companions: 0,
      arrival: "",
      departure: "",
    });
  };

  const OnLogout = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  useEffect(() => {
    console.log("TEsting useEffect called");
  }, [title]);

  useEffect(() => {
    dispatch(getUserBooking());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    } else if (bookingError) {
      toast.error(bookingMessage);
    }
  }, [bookingError, bookingMessage, bookingSuccess, navigate, dispatch]);

  return (
    <>
      <div className="booking">
        <div className="backBookin">
          <Navbar />
        </div>
        <div className="booking-container">
          <div className="bookin-form">
            <div className="bookmid">
              <h2>{title}</h2>
            </div>
            <div className="formarea">
              <form onSubmit={handleSubmit}>
                <div className="input1">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                </div>
                <div className="input2">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="number"
                    placeholder="Contact No."
                    name="contact"
                    value={contact}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <label htmlFor="companions">Companions</label>
                  <input
                    type="number"
                    placeholder="No. of Companions"
                    name="companions"
                    value={companions}
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="arrival">Arrival</label>
                <input
                  type="date"
                  placeholder="Arrival Date:"
                  name="arrival"
                  value={arrival}
                  onChange={handleChange}
                  id="arrival"
                />
                <label htmlFor="departure">Departure</label>
                <input
                  type="date"
                  placeholder="Departure Date:"
                  name="departure"
                  value={departure}
                  onChange={handleChange}
                  id="departure"
                />
                <div className="buttonsub">
                  <p>
                    By clicking Submitting <br /> you are agreeing to our{" "}
                    <a href="#">Terms and Conditions</a>
                  </p>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
          {showModal && <BookingModal />}
        </div>
      </div>
      <div className="bookingstatus">
        <div className="statusContainer">
          <div className="statusmid">
            <h2>Status</h2>
          </div>
          {booking ? (
            <>
              <h1>Logged in as {user.username}</h1>
              <h3>name: {booking.fullname}</h3>
              <h3>Address: {booking.address}</h3>
              <h3>Contact: {booking.contact}</h3>
              <h3>Email: {booking.email}</h3>
              <h3>Companions: {booking.companions}</h3>
              <h3>Arrival: {booking.arrival}</h3>
              <h3>Departure: {booking.departure}</h3>
              <h3>Booking Status: {booking.status}</h3>
            </>
          ) : (
            <h1>No booking</h1>
          )}
          <button onClick={OnLogout}>Log out</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
