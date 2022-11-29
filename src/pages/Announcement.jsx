import AdminHeader from "../components/AdminHeader";
import AdminLinks from "../components/AdminLinks";
import { updateAnnounce, getAnnouncements } from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Announcement = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { announcements, adminLoading, adminError, adminSuccess } = useSelector(
    (state) => state.admin
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAnnounce({ id: announcements._id, text }));
    setText("");
  };

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [navigate, dispatch, adminError]);

  return (
    <>
      <AdminHeader />
      <AdminLinks />
      <div className="announcemt">
        <h2>Announcements</h2>
        <div className="announcement-container">
          <h3>Today's announcement</h3>
          <div className="announce-row">
            <div className="acol1">
              <div className="announcement-box">
                <h3>{announcements.text}</h3>
              </div>
            </div>
            <div className="a-col2">
              <form onSubmit={handleSubmit}>
                <textarea
                  type="text"
                  name="text"
                  id="text"
                  placeholder="input announcements"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Announce</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
