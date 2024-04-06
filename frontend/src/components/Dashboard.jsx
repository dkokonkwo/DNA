import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../components.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import NavbarMain from "./TopHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSunPlantWilt } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tempCel, setTempCel] = useState("");
  const [tempFar, setTempFar] = useState("");
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [lastPost, setLastPost] = useState({});
  const [city, setCity] = useState("");
  const [systemStatus, setSystemStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("https://dna-e9hf.onrender.com/@me", {
          withCredentials: true,
        });
        // No need to call response.json() with Axios, response.data holds the response data directly
        const data = response.data;
        if (response.status === 200) {
          // Handle successful login
          console.log(data.id);
          fetchDashboard();
        } else {
          // You can redirect the user to the login page if needed
          navigate("/login");
        }
      } catch (error) {
        // Handle network errors or server errors
        console.error("An error occurred:", error);
        if (error.response.status === 401 || error.response.status === 404) {
          console.log("Unathorized");
          navigate("/login");
        }
      }
    };

    checkLogin();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("https://dna-e9hf.onrender.com/", {
        withCredentials: true,
      });
      const data = response.data;
      if (response.status === 200) {
        // Handle successful login
        console.log(data.weather);
        console.log(data.weather.lat);
        console.log(data.weather.lon);
        // alert("yes");
        setDescription(data.weather.description);
        setHumidity(data.weather.humidity);
        setLat(data.weather.lat);
        setLon(data.weather.lon);
        setLocalTime(data.weather.localTime);
        setTempCel(data.weather.celsius);
        setTempFar(data.weather.fahrenheit);
        setCity(data.weather.city);
        setLastPost(data.lastPost);
      } else {
        // You can redirect the user to the login page if needed
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      if (error.response.status === 401) {
        alert("Unathorized");
      }
    }
  };

  const marker = {
    geocode: [lat, lon],
    popUp: "farm location",
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [38.38],
  });

  return (
    <div className="page-0">
      <NavbarMain />
      <Container fluid className="dash-body">
        <Row className="main-stats">
          <h4>Quick Stats</h4>
          <Col className="col-3">
            <div className="top">
              <h6>My Farm</h6>
              <div className="status">
                <h5>System Status</h5>
                <h1 className={systemStatus ? "row-green" : "row-red"}>
                  {systemStatus ? "Online" : "Offline"}
                </h1>
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-1">
                <h6>Farm Temp.</h6>
                <div className="temps">
                  <p>{tempCel}°C</p>
                  <p>/</p>
                  <p>{tempFar}°F</p>
                </div>
              </div>
              <div className="bottom-1">
                <h6>Farm Humidity</h6>
                <div className="temps-2">
                  <p>{humidity}%</p>
                  <FontAwesomeIcon
                    icon={faSunPlantWilt}
                    color="#b4cade"
                    className="wilt"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col className="col-3">
            <div className="top">
              <h6>Local Weather Data</h6>
              <div className="desc-recent">
                <h5>{city},</h5>
                <h5>{description ? description : "loading..."}</h5>
                <p>{localTime}</p>
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-1">
                <h6>Temp.</h6>
                <div className="temps">
                  <p>{tempCel}°C</p>
                  <p>/</p>
                  <p>{tempFar}°F</p>
                </div>
              </div>
              <div className="bottom-1">
                <h6>Humidity</h6>
                <div className="temps-2">
                  <p>{humidity}%</p>
                  <FontAwesomeIcon
                    icon={faSunPlantWilt}
                    color="#b4cade"
                    className="wilt"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col className="col-3">
            <div className="top">
              <h6>Active</h6>
            </div>
            <div className="bottom">
              <div className="bottom-1" id="sch-time">
                <h6>Last Scheduled</h6>
                <h3>06:23AM</h3>
              </div>
              <div className="bottom-1" id="sch-time">
                <h6>Next</h6>
                <h3>05:27PM</h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="other-stats">
          <h4>Other Stats</h4>
          <Col className="col-4" id="bigger">
            <div className="live-location">
              <MapContainer center={marker.geocode} zoom={2}>
                <TileLayer
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
                />
                <Marker position={marker.geocode} icon={customIcon}>
                  <Popup>{marker.popUp}</Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="other-thing"></div>
          </Col>
          <Col className="col-4" id="smaller">
            <h5>Recent Post</h5>
            <div className="last-post">
              {lastPost ? (
                <>
                  <h6>{lastPost.title}</h6>
                  <p>{lastPost.content}</p>
                  <p className="date">- {lastPost.dateCreated}</p>
                </>
              ) : (
                <h3>No posts</h3>
              )}
            </div>
            <Nav.Link as={Link} to={"/posts"}>
              Go to Posts
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
