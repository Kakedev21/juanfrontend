import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getBookingsCount,
  getBookingToday,
  countUser,
} from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/AdminHeader";
import AdminLinks from "../components/AdminLinks";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    totalBookings,
    admin,
    adminLoading,
    adminError,
    adminSuccess,
    bookingToday,
    totalUsers,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getBookingsCount());
    dispatch(getBookingToday());
    dispatch(countUser());
  }, [admin, adminError, adminSuccess, navigate, dispatch]);

  const data = totalBookings;

  return (
    <>
      <AdminHeader />
      <AdminLinks />
      <div className="admin">
        <div className="adminContainer">
          <h3>Dashboard</h3>
          <div className="dashboard-row">
            <div className="col1">
              <h2>Bookings Today: {bookingToday}</h2>
              <h2>Total User: {totalUsers}</h2>
              <h2>Total Bookings: 20</h2>
            </div>
            <div className="col2">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="booked" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
