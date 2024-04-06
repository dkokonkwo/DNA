import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../contact.css";
import NavbarMain from "./TopHeader";
import axios from "axios";
import { useEffect } from "react";

const Contact = () => {
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

  return (
    <div className="page-2">
      <NavbarMain />
      <Container fluid className="contact-body">
        <Row className="body-row">
          <Col className="columns">
            <div className="contact-card">
              <div className="contact-info">
                <h2>Get in touch.</h2>
                <p>
                  For questions, technical assistance, or collaboration
                  opportunities via the contact information provided.
                </p>
              </div>
              <div className="contact-details">
                <div className="details">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#0084ff"
                    className="icons"
                  />
                  <p>d.okonkwo@alustudent.com</p>
                </div>
                <div className="details">
                  <FontAwesomeIcon
                    icon={faPhone}
                    color="#0084ff"
                    className="icons"
                  />
                  <p>+123-456-7890</p>
                </div>
                <div className="details">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    color="#0084ff"
                    className="icons"
                  />
                  <p>dnaofficialhelp.com</p>
                </div>
                <div className="details">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    color="#0084ff"
                    className="icons"
                  />
                  <p>23 Ransome Kuti Ave, Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </Col>
          <Col className="columns">
            <div className="contact-form">
              <Form>
                <Form.Group className="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <div className="email-phone">
                  <Form.Group
                    className="phone"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group
                    className="phone"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </div>
                <Form.Group
                  className="text"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Mesage</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="contact-button"
                >
                  Send
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
