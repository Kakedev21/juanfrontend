import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userReset } from "../features/user/userSlice";
import axios from "axios";
import { errorResponse } from "../helpers/response";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = userData;

  //redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userError, userSuccess, userMessage } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    setUserData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (data) => {
    try {
      const response = await axios.post("/user/register", data);
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      return error.response.data.error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(userData);
    console.log(response);
    if (response === "Success!") {
      navigate("/login");
    }
    toast.error(errorResponse[response]);
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    } else if (user || userSuccess) {
      navigate("/booking");
    }
    dispatch(userReset());
  }, [user, userError, userSuccess, dispatch, navigate]);

  return (
    <>
      <main>
        <Navbar />
        <div className="register">
          <div className="register-container">
            <div className="reg-title">
              <h3>Register</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="confirm password"
                value={password2}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            <h4>already have an account?</h4>
            <p>
              <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
