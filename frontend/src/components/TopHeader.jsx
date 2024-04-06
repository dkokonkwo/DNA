import Container from "react-bootstrap/Container";
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
import Button from "react-bootstrap/Button";
import logo from "../assets/img/logo.png";
import iron from "../assets/img/default.jpg";
import axios from "axios";

const NavbarMain = () => {
  const logout = async () => {
    try {
      const response = await axios.get("https://dna-e9hf.onrender.com/logout", {
        withCredentials: true,
      });
      // No need to call response.json() with Axios, response.data holds the response data directly
      const data = response.data;
      if (response.status === 200) {
        // Handle successful login
        alert(data.message);
        window.location.href = "/login";
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
          <div className="profile-pic">
            <Nav.Link as={Link} to={"/profile"}>
              <img src={iron} alt="profilepic" />
            </Nav.Link>
            <Button onClick={logout}>Log out</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
