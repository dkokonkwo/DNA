import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import logo from "../assets/img/logo.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../login.css";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = ({ updateCallback }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    const url = "https://dna-e9hf.onrender.com/login";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Setting credentials to true
      });

      if (response.status === 201 || response.status === 200) {
        // Login successful, redirect to home page or do any other action
        window.location.href = "/";
      } else {
        // Handle other response statuses
        alert(response.data.message);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      alert(error.response.data.message);
    }
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <>
      <header className="login-header">
        <h2>DIGITAL NOURISH AFRICA</h2>
        <div className="logo-div">
          <img src={logo} alt="logo" />
        </div>
        <Nav.Link as={Link} to={"/signup"} className="signup-div">
          <Button onClick={goToSignup}>
            Sign Up
            <FontAwesomeIcon icon={faArrowRight} className="icons" />
          </Button>
        </Nav.Link>
      </header>
      <Container fluid className="login">
        <div className="centered-form">
          <Form onSubmit={onSubmitLogin} className="login-form">
            <FloatingLabel
              controlId="email"
              label="Email address"
              className="email"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="password"
              label="Password"
              className="email"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button type="submit">Login</Button>
          </Form>
          <div className="extras">
            <Nav.Link as={Link} to={"/signup"}>
              Create Account
            </Nav.Link>
            <a>Need Help?</a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
