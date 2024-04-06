import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import logo from "../assets/img/logo.png";
import Contact from "./Contact";
import Farm from "./Farm";
import Dashboard from "./Dashboard";
import iron from "../assets/img/default.jpg";
import Profile from "./Profile";
import Posts from "./Posts";
import Login from "./Login";
import SignUp from "./SignUp";

const NavbarMain = () => {
  return (
    <Navbar expand="lg" className="header">
      <Container fluid className="header-contain">
        <Navbar.Brand href="#" className="logo">
          <img src={logo} alt="logo" />
          <h2>DNA</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="collapse-content">
          <Nav className="links" navbarScroll>
            <Nav.Link as={Link} to={"/"}>
              Dashboard
            </Nav.Link>
            <NavDropdown title="Farms" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to={"/farm"}>
                Farm 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">Farm 2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={"/posts"}>
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to={"/contact"}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav.Link as={Link} to={"/profile"} className="profile-pic">
            <img src={iron} alt="profilepic" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const response = await fetch("https://dna-e9hf.onrender.com/@me");
  //     const data = await response.json();
  //     console.log(data.id);
  //     alert(data.id);
  //     if (response.status === 200) {
  //       setIsLoggedIn(true);
  //       // alert(data.message);
  //       console.log(data.id);
  //       alert(data.id);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkLogin();
  // }, []);

  const onUpdateLogin = () => {
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  return (
    <Router>
      {/* <NavbarMain /> */}
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Header;
