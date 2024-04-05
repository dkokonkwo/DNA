import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import iron from "../assets/img/default.jpg";
import "../components.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import NavbarMain from "./TopHeader";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [systemStatus, setSystemStatus] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/@me", {
          withCredentials: true,
        });
        // No need to call response.json() with Axios, response.data holds the response data directly
        const data = response.data;
        if (response.status === 200) {
          // Handle successful login
          console.log(data.id);
          setUsername(data.username);
          setEmail(data.email);
          setUserType(data.userType);
          getRegion();
        } else {
          // You can redirect the user to the login page if needed
          window.location.href = "/login";
        }
      } catch (error) {
        // Handle network errors or server errors
        console.error("An error occurred:", error);
        if (error.response.status === 401 || error.response.status === 404) {
          alert("Unathorized");
          window.location.href = "/login";
        }
      }
    };

    checkLogin();
  }, []);

  const getRegion = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get_region", {
        withCredentials: true,
      });
      // No need to call response.json() with Axios, response.data holds the response data directly
      const data = response.data;
      if (response.status === 200) {
        // Handle successful login
        console.log(data.id);
        setCountry(data.country);
        setState(data.state);
        setCity(data.city);
      } else {
        // You can redirect the user to the login page if needed
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      if (error.response.status === 404) {
        alert(response.data.message);
      }
    }
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();

    const data = {
      email,
      username,
      password,
    };

    const url = "http://127.0.0.1:5000/update_profile";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Setting credentials to true
      });
      const resp = response.data;
      if (response.status === 201 || response.status === 200) {
        alert(resp.message);
      } else {
        // Handle other response statuses
        alert(response.data.message);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const UpdateRegion = async (e) => {
    e.preventDefault();

    const data = {
      country,
      state,
      city,
    };

    const url = "http://127.0.0.1:5000/region";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Setting credentials to true
      });
      const resp = response.data;
      if (response.status === 201 || response.status === 200) {
        // Login successful, redirect to home page or do any other action
        alert(resp.message);
      } else {
        // Handle other response statuses
        alert(response.data.message);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <NavbarMain />
      <Container fluid className="profile">
        <Row>
          <Col className="col-3" id="farm">
            <div className="rows-farm">
              <h5>User Type</h5>
              <h1>{userType ? userType : "Undefined"}</h1>
            </div>
            <div className="rows-farm">
              <h5>System Status</h5>
              <h1 className={systemStatus ? "row-green" : "row-red"}>
                {systemStatus ? "Online" : "Offline"}
              </h1>
            </div>
            <div className="rows-farm">
              <h5>Number of Farms</h5>
              <h1>1</h1>
            </div>
            <Form onSubmit={UpdateRegion}>
              <h5>Update Region</h5>
              <Row className="regione">
                <Col className="col-6">
                  <Form.Control
                    type="text"
                    placeholder="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
                <Col className="col-6">
                  <Form.Control
                    type="text"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="regione">
                <Col className="col-6">
                  <Form.Control
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col className="col-6">
                  <Button variant="primary" type="submit">
                    Update Region
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="col-3" id="personal">
            <img src={iron} alt="profile pic" />
            <Form onSubmit={onUpdateProfile}>
              <Row>
                <Col className="col-6">
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
                <Col className="col-6">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Form.Group className="group" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Info
              </Button>
            </Form>
          </Col>
          <Col className="col-3" id="other-information">
            <div className="region">
              <div className="reg">
                <h5>Country</h5>
                <h1 className="line">{country ? country : "Not updated"}</h1>
              </div>
              <div className="reg">
                <h5>State</h5>
                <h1 className="line">{state ? state : "Not updated"}</h1>
              </div>
              <div className="reg">
                <h5>City</h5>
                <h1>{city ? city : "Not updated"}</h1>
              </div>
            </div>
            <div className="number-posts">
              <h5>Posts</h5>
              <h1>0</h1>
              <Button>Delete all posts</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
