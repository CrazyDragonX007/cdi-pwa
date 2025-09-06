
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";


import firebase from "../../helpers/firebase";

export default () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'sent' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrorMsg('');
    if (!email) return;
    try {
      // Ask Firebase to send the reset email
      await firebase.auth().sendPasswordResetEmail(email);
      setStatus('sent');

      // Optional: notify your backend / log the request
      if (process.env.REACT_APP_BACKEND_URL) {
        try {
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
        } catch (err) {
          // ignore backend logging errors for the user flow
          console.warn('backend forgot-password logging failed', err);
        }
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send reset email');
      console.error(err);
    }
  };

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control
                        required
                        autoFocus
                        type="email"
                        placeholder="john@cdi.build"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </div>

                  {status === 'sent' ? (
                    <div className="alert alert-success">A password reset email has been sent. Check your inbox.</div>
                  ) : null}
                  {status === 'error' ? (
                    <div className="alert alert-danger">{errorMsg}</div>
                  ) : null}

                  <Button variant="primary" type="submit" className="w-100">
                    Recover password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
