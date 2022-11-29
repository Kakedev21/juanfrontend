import React from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Areas from "./pages/Areas";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Announcement from "./pages/Announcement";
import AdminLogs from "./pages/AdminLogs";
import Navigator from "./pages/Navigator";
import { ToastContainer } from "react-toastify";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/adminlogs" element={<AdminLogs />} />
        <Route path="/navigator" element={<Navigator />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
