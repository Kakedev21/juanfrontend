import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCampground } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../features/admin/adminSlice";
import { useEffect } from "react";
import c1 from "../img/c1.svg";
import c2 from "../img/c2.svg";
import c3 from "../img/c3.svg";
import c4 from "../img/c4.svg";
import s1 from "../img/s1.svg";
import s2 from "../img/s2.svg";
import s3 from "../img/s3.svg";
import s4 from "../img/s4.svg";
import ofi from "../img/ofi.png";
import moun1 from "../img/moun1.jpg";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();

  const { announcements, adminError } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <>
      <main>
        <Navbar />
        <div className="main-container">
          <div className="main-row">
            <div className="main-col1">
              <h1>MT. Kalisungan</h1>
              <h2>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginRight: "15px" }}
                />
                Calauan Laguna
              </h2>
              <p>
                Enjoy this 4.8-km out-and-back trail near Calauan, Laguna.
                Generally considered a moderately challenging route, it takes an
                average of 2 h 58 min to complete. This trail is great for
                hiking and walking.
              </p>
              <button className="_outlined">
                <a
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                  href="#explore"
                >
                  Explore now
                </a>
              </button>
            </div>
          </div>
          <div className="main-col2">
            <h3>Information Board</h3>
            <div className="information-box">
              <p>
                AS OF:{" "}
                {new Date().toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              {announcements ? (
                <small>{announcements.text}</small>
              ) : (
                <small>No important Announcement</small>
              )}
            </div>
          </div>
        </div>
        <div className="explore" id="explore">
          <h1>Adventure!</h1>
          <div className="explore-container">
            <div className="card">
              <img src={c1} alt="" />
              <p>Beginner Friendly</p>
            </div>
            <div className="card">
              <img src={c2} alt="" />
              <p>Challenges</p>
            </div>
            <div className="card">
              <img src={c3} alt="" />
              <p>Friendly tourist Guide</p>
            </div>
            <div className="card">
              <img src={c4} alt="" />
              <p>Best Experience</p>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="about-container">
            <div className="about-title">
              {" "}
              <h1>About</h1>
            </div>
            <div className="mountain">
              <iframe
                className="mapbox"
                width="100%"
                height="400px"
                src="https://api.mapbox.com/styles/v1/admin1233/cl5n0lhv2000014ny4w5mktye.html?title=false&access_token=pk.eyJ1IjoiYWRtaW4xMjMzIiwiYSI6ImNsNTRhNnNheTB4aTMza215dzlndW0zOXgifQ.dQ6Mu8nTg2cB9bWoeumU-w&zoomwheel=false#16.18/14.145303/121.3305/99.7/67"
                title="Outdoors-copy"
              ></iframe>
              <div className="mountain-desc">
                <div className="mount-title">
                  <h2>Mt. Kalisungan</h2>
                </div>
                <p>
                  Mt. Kalisungan, a rising tourist attraction in South Luzon
                  noted for its beauty, is definitely attractive, particularly
                  for those who enjoy hiking, trekking, and mountain climbing.
                  According to some mountaineers, the mountain specifications
                  are minor climb, difficulty 3/9, trail class needing 1-2 days
                  required/hours to summit is 1 day/2.5-3 hours and boasts a
                  360-degree view of the Southern Tagalog highlands and the view
                  of San Pablo's seven lakes. Mt. Kalisungan is one of the
                  smaller mountains in the Southern Tagalog area, located near
                  Calauan, Laguna. It is prominent since it is one of the
                  mountains that face the Banahaw Trilogy. Furthermore, it holds
                  a significant position in history as the last stand of the
                  retreating Japanese forces in Laguna towards the conclusion of
                  World War II (1945-1946). It was – and still is – a mountain
                  with many names. Some refer to it as Mt. Calauan or Mt.
                  Nagcarlan, after the two towns it borders; others refer to it
                  as Mt. Lamot, since it is located in Brgy. Lamot in Calauan
                  Laguna. Mt. Kalisungan has a total height gain of 587 meters
                  and a maximum altitude of 700 meters.
                </p>
              </div>
            </div>
            <div className="tourism"></div>
          </div>
        </div>
        <div className="Services">
          <h1>Features</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, maxime!
          </p>
          <div className="service-cards">
            <div className="service-card">
              <h3>24/7 Emergency Hotline</h3>
              <img src={s1} alt="" />
              <div className="layer">
                <p>029123</p>
              </div>
            </div>
            <div className="service-card">
              <h3>User gps tracking</h3>
              <img src={s2} alt="" />
              <div className="layer">
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="service-card">
              <h3>Baranggay Officials</h3>
              <img src={s3} alt="" />
              <div className="layer">
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="service-card">
              <h3>Authorized Tourist Guide</h3>
              <img src={s4} alt="" />
              <div className="layer">
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <button>
            <a href="/register">Reserve Now!</a>
          </button>
        </div>

        {/* <div className="peak-view">
        <h1>Enjoy the full 360 view of the peak</h1>
        <iframe
          className="iframe"
          src="https://momento360.com/e/u/ec8dcbaa5ecf4f3d96337db351cfd02a?utm_campaign=embed&utm_source=other&heading=360.35&pitch=16.99&field-of-view=75&size=medium"
          frameBorder="0"
        ></iframe>
      </div> */}
      </main>

      <Footer />
    </>
  );
};

export default Home;
