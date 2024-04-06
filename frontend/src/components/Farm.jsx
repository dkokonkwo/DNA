import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import NavbarMain from "./TopHeader";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Farm = () => {
  const [tempCel, setTempCel] = useState("");
  const [tempFar, setTempFar] = useState("");
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [systemStatus, setSystemStatus] = useState("");
  const [randomInt1, setRandomInt1] = useState("");
  const [randomInt2, setRandomInt2] = useState("");
  const [randomInt3, setRandomInt3] = useState("");
  const [randomInt4, setRandomInt4] = useState("");

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
          numbersRand();
        } else {
          // You can redirect the user to the login page if needed
          window.location.href = "/login";
        }
      } catch (error) {
        // Handle network errors or server errors
        console.error("An error occurred:", error);
        if (error.response.status === 401) {
          alert("Unathorized");
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
        setTempCel(data.weather.celsius);
        setTempFar(data.weather.fahrenheit);
      } else {
        // You can redirect the user to the login page if needed
        // window.location.href = "/login";
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      if (error.response.status === 401) {
        alert("Unathorized");
      }
    }
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const numbersRand = () => {
    setRandomInt1(getRandomInt(0, 225));
    setRandomInt2(getRandomInt(20, 100));
    setRandomInt3(getRandomInt(10, 50));
    setRandomInt4(getRandomInt(50, 100));
  };

  const marker = {
    geocode: [lat, lon],
    popUp: "farm location",
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [38.38],
  });

  const demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  const data = [
    {
      name: "1:00",
      hum: 40,
      temp: 2,
    },
    {
      name: "2:00",
      hum: 45,
      temp: 7,
    },
    {
      name: "3:00",
      hum: 52,
      temp: 9,
    },
    {
      name: "4:00",
      hum: 50,
      temp: 10,
    },
    {
      name: "5:00",
      hum: 55,
      temp: 12,
    },
    {
      name: "6:00",
      hum: 57,
      temp: 18,
    },
    {
      name: "7:00",
      hum: 55,
      temp: 20,
      amt: 0,
    },
  ];

  const dataTwo = [
    {
      name: "1:00",
      light: 2,
    },
    {
      name: "2:00",
      light: 7,
    },
    {
      name: "3:00",
      light: 9,
    },
    {
      name: "4:00",
      light: 10,
    },
    {
      name: "5:00",
      light: 12,
    },
    {
      name: "6:00",
      light: 18,
    },
    {
      name: "7:00",
      light: 20,
    },
  ];

  const dataThree = [
    {
      name: "1:00",
      moisture: 12,
    },
    {
      name: "2:00",
      moisture: 23,
    },
    {
      name: "3:00",
      moisture: 34,
    },
    {
      name: "4:00",
      moisture: 40,
    },
    {
      name: "5:00",
      moisture: 52,
    },
    {
      name: "6:00",
      moisture: 55,
    },
    {
      name: "7:00",
      moisture: 54,
    },
  ];

  return (
    <div className="page-3">
      <NavbarMain />
      <Container fluid className="farm-container">
        <div className="big-col">
          <Row className="sensor-data">
            <Col className="col-3">
              <div className="sensor">
                <h4>DHT</h4>
                <div className="current">
                  <FontAwesomeIcon
                    icon={faCloud}
                    color="#ffffff"
                    className="sensor-icons"
                  />
                  <p>
                    {randomInt2}% / {randomInt3}°C
                  </p>
                </div>
              </div>
              <div className="graph">
                <ResponsiveContainer width="90%" height="95%">
                  <LineChart
                    width={250}
                    height={250}
                    data={data}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      height={10}
                      stroke="white"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={25} stroke="white" />
                    <Tooltip />
                    <Legend
                      wrapperStyle={{ fontSize: "15px", margin: "-10px 0" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#0084ff"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="hum" stroke="#20b2aa" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Col>
            <Col className="col-3">
              <div className="sensor">
                <h4>Light Intensity</h4>
                <div className="current">
                  <FontAwesomeIcon
                    icon={faSun}
                    color="#ffffff"
                    className="sensor-icons"
                    id="test"
                  />
                  <p>{randomInt1} LUX</p>
                </div>
              </div>
              <div className="graph">
                <ResponsiveContainer width="90%" height="95%">
                  <LineChart
                    width={250}
                    height={250}
                    data={dataTwo}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      height={10}
                      stroke="white"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={25} stroke="white" />
                    <Tooltip />
                    <Legend
                      wrapperStyle={{ fontSize: "15px", margin: "-10px 0" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="light"
                      stroke="#0084ff"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Col>
            <Col className="col-3">
              <div className="sensor">
                <h4>Soil Moisture</h4>
                <div className="current">
                  <FontAwesomeIcon
                    icon={faWater}
                    color="#ffffff"
                    className="sensor-icons"
                  />
                  <p>{randomInt4}%</p>
                </div>
              </div>
              <div className="graph">
                <ResponsiveContainer width="90%" height="95%">
                  <LineChart
                    width={250}
                    height={250}
                    data={dataThree}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      height={10}
                      stroke="white"
                    />
                    <YAxis tick={{ fontSize: 12 }} width={25} stroke="white" />
                    <Tooltip />
                    <Legend
                      wrapperStyle={{ fontSize: "15px", margin: "-10px 0" }}
                    />
                    <Line type="monotone" dataKey="moisture" stroke="#20b2aa" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
          <Row className="other-data">
            <Col className="col-3">
              <h5>User location - live</h5>
              <div className="live-location-2">
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
            </Col>
            <Col className="col-3">
              <h5>Systems Online</h5>
              <div className="online">
                <h3>DHT Sensor</h3>
                <FontAwesomeIcon
                  icon={faTemperatureHigh}
                  color="#4de74d"
                  className="sensor-icons-1"
                />
              </div>
              <div className="online">
                <h3>Light Sensor</h3>
                <FontAwesomeIcon
                  icon={faCloudSun}
                  color="#4de74d"
                  className="sensor-icons-1"
                />
              </div>
              <div className="online">
                <h3>S.M Sensor</h3>
                <FontAwesomeIcon
                  icon={faWater}
                  color="#4de74d"
                  className="sensor-icons-1"
                />
              </div>
            </Col>
            <Col className="col-3" id="last-next">
              <h5>Irrigation</h5>
              <div className="gation">
                <h3>Last:</h3>
                <h6>06:23AM</h6>
              </div>
              <div className="gation">
                <h3>Next:</h3>
                <h6>05:23PM</h6>
              </div>
            </Col>
          </Row>
        </div>
        <div className="small-col">
          <div className="api">
            <h5>Weather Now:</h5>
            <div className="temp-hum">
              <div className="temps-1">
                <h4>Temp: </h4>
                <h3>
                  {tempCel}°C / {tempFar}°F
                </h3>
              </div>
              <div className="hum">
                <h4>Humidity:</h4>
                <h3>{humidity}% </h3>
              </div>
            </div>
          </div>
          <div className="api">
            <h5>My Farm</h5>
            <h4>Farm Name</h4>
          </div>
          <div className="api" id="time">
            <h5>Time since planted</h5>
            <h3>10 days</h3>
          </div>
          <div className="api" id="rig">
            <h5>Quick Irrigation</h5>
            <h4>Manually start a 5 min irrigation</h4>
            <Button>Run</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Farm;
