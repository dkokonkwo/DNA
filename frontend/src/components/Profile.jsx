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
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countryISO, setCountryISO] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

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
          setUsername(data.username);
          setEmail(data.email);
          setUserType(data.userType);
          getRegion();
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

  const getRegion = async () => {
    try {
      const response = await axios.get("https://dna-e9hf.onrender.com/get_region", {
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

    const url = "https://dna-e9hf.onrender.com/update_profile";

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

    const url = "https://dna-e9hf.onrender.com/region";

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

  const countryData = Country.getAllCountries().map((countryOne) => ({
    value: countryOne.name,
    displayValue: countryOne.name,
    isoCode: countryOne.isoCode,
  }));

  const handleChangeCountry = (e) => {
    const selectedCountryName = e.target.value;
    const country = countryData.find(
      (country) => country.value === selectedCountryName
    );
    setCountry(selectedCountryName);
    setCountryISO(country.isoCode);
    setStateData(
      State.getStatesOfCountry(country.isoCode).map((state) => ({
        value: state.name,
        displayValue: state.name,
        isoCode: state.isoCode,
      }))
    );
    // clear state and city when state changes
    setState("");
    setCity("");
    setCityData([]);
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    const state = stateData.find((state) => state.value === selectedStateName);
    setState(selectedStateName);
    console.log(state.isoCode, countryISO);
    setCityData(
      City.getCitiesOfState(countryISO, state.isoCode).map((city) => ({
        value: city.name,
        displayValue: city.name,
      }))
    );
    // Clear city when state changes
    setCity("");
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
              <h1 className={userType ? "row-green" : "row-red"}>
                {userType ? "Online" : "Offline"}
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
                  <Form.Select
                    className="form-select-1"
                    value={country}
                    onChange={handleChangeCountry}
                  >
                    {countryData.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.displayValue}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col className="col-6">
                  <Form.Select
                    className="form-select-1"
                    value={state}
                    onChange={handleStateChange}
                  >
                    {stateData.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.displayValue}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="regione">
                <Col className="col-6">
                  <Form.Select
                    className="form-select-1"
                    value={state}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {cityData.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.displayValue}
                        </option>
                      );
                    })}
                  </Form.Select>
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
