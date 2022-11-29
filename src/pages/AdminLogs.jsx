import AdminHeader from "../components/AdminHeader";
import AdminLinks from "../components/AdminLinks";
import { getAllBookings, editBooking } from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const bookings = useSelector((state) => state.admin.bookings);

  const handleApprove = (id) => {
    setStatus("Approved");
    setSelectedId(id);
  };

  const handleReject = (id) => {
    setStatus("rejected");
    setSelectedId(id);
  };

  useEffect(() => {
    if (status && selectedId) {
      dispatch(editBooking({ id: selectedId, status })).finally(() => {
        setStatus("");
        setSelectedId(null);
      });
    }
  }, [status, selectedId, dispatch]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <>
      <AdminHeader />
      <AdminLinks />
      <div className="log">
        <div className="log-container">
          <table>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Companions</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Status</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((allbook) => (
                <tr key={allbook._id}>
                  <td>{allbook.fullname}</td>
                  <td>{allbook.email}</td>
                  <td>{allbook.contact}</td>
                  <td>{allbook.address}</td>
                  <td>{allbook.companions}</td>
                  <td>{allbook.arrival}</td>
                  <td>{allbook.departure}</td>
                  <td>{allbook.status}</td>
                  <td>
                    <button onClick={() => handleApprove(allbook._id)}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(allbook._id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminLogs;
