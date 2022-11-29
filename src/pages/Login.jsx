import Navbar from "../components/Navbar";
import { loginUser, userReset } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
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
              <h3>Log in</h3>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
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
              <button type="submit" style={{ marginTop: "20px" }}>
                Submit
              </button>
            </form>
            <h4>not yet registered?</h4>
            <p>
              <a href="/register">create an account</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
