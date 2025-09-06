import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import firebase from "../../helpers/firebase";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import axios from "axios";
// ...existing code...

export default () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');           // { changed code }
  const [successMsg, setSuccessMsg] = useState('');       // { changed code }
  const history = useHistory();

  const login = async (e) => {                             // { changed code }
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const url = process.env.REACT_APP_BACKEND_URL+'/crud/login';
      const params = {google_uid: userCredential.user.uid};
      const response = await axios.post(url,params);
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      localStorage.setItem('accessRole', response.data[0].accessRole);
      setSuccessMsg('Signed in — redirecting...');
      history.push('/');
    } catch (error) {
      // map common firebase auth errors to friendly messages
      let msg = 'Sign in failed';
      console.log(error.code)
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            msg = 'No account found for this email.';
            break;
          case 'auth/invalid-credential':
            msg = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            msg = 'Invalid email address.';
            break;
          default:
            // keep generic message
            msg = 'Sign in failed';
        }
      }
      setErrorMsg(msg);
      console.error('login error', error);
    }
  }                                                     // { changed code }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/* ...existing code... */}
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign In</h3>
                </div>

                {/* alerts */}
                { errorMsg && <div className="alert alert-danger">{errorMsg}</div> }    {/* { changed code } */}
                { successMsg && <div className="alert alert-success">{successMsg}</div> }{/* { changed code } */}

                <Form className="mt-4" onSubmit={login}>
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
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
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
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end" as={Link} to={Routes.ForgotPassword.path}>Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
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
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
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
