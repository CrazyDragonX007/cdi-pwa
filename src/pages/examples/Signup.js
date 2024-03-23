
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUser, faMobile } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    // termsChecked: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const apiURL = 'http://localhost:8000';
  const createUser = `${apiURL}/crud/createUser`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.termsChecked) {
    //   alert('Please agree to the terms and conditions.');
    //   return;
    // }

    try {
      await axios.post(createUser, formData);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };


  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group id="firstName" className="mb-4" >
                  <Form.Label>First Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                    <Form.Control
                      autoFocus
                      required
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group id="lastName" className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                    <Form.Control
                      autoFocus
                      required
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group id="email" className="mb-4">
                  <Form.Label>Your Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <Form.Control
                      autoFocus
                      required
                      type="email"
                      placeholder="example@company.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group id="mobileNo" className="mb-4">
                  <Form.Label>Your Mobile No.</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faMobile} />
                    </InputGroup.Text>
                    <Form.Control
                      autoFocus
                      required
                      type="number"
                      placeholder="Mobile Number"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Your Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>

                {/* <FormCheck
                  type="checkbox"
                  className="d-flex mb-4"
                  label={
                    <span>
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </span>
                  }
                  id="termsChecked"
                  name="termsChecked"
                  checked={formData.termsChecked}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      termsChecked: e.target.checked
                    }))
                  }
                /> */}

                <Button variant="primary" type="submit" className="w-100">
                  Sign up
                </Button>
              </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SignUpForm;
