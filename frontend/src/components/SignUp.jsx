import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../login.css";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

const SignUp = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitSignUp = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      confirmPassword,
      userType,
    };

    if (password !== confirmPassword) {
      alert("Passwords must match");
      return;
    }

    if (!userType) {
      alert("Add a user type");
      return;
    }

    const url = "http://127.0.0.1:5000/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      // updateCallback();
      window.location.href = "/login";
    }
  };

  return (
    <>
      <header className="login-header">
        <h2>DIGITAL NOURISH AFRICA</h2>
        <div className="logo-div">
          <img src={logo} alt="logo" />
        </div>
        <Nav.Link as={Link} to={"/login"} className="signup-div">
          <Button>
            Login
            <FontAwesomeIcon icon={faArrowRight} className="icons" />
          </Button>
        </Nav.Link>
      </header>
      <Container fluid className="sign-up">
        <div className="centered-form-2">
          <Form onSubmit={onSubmitSignUp}>
            <Form.Label>User Type</Form.Label>
            <Form.Select
              className="user-type"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>Select</option>
              <option value="Farmer">Farmer</option>
              <option value="Technician">Technician</option>
            </Form.Select>
            <div className="other-signup">
              <Form.Group className="input" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="input" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="other-signup">
              <Form.Group className="input" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="input" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </div>
            <Button type="submit" className="signup-button">
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
