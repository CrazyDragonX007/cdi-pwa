
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import { useLocation, useHistory } from 'react-router-dom';
import firebase from "../../helpers/firebase";

export default () => {
  const location = useLocation();
  const history = useHistory();
  const [oobCode, setOobCode] = useState(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null); // null|'ready'|'error'|'success'|'verifying'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('oobCode');
    if (code) {
      setOobCode(code);
      setStatus('verifying');
      firebase.auth().verifyPasswordResetCode(code).then((emailFromCode) => {
        setEmail(emailFromCode);
        setStatus('ready');
      }).catch((err) => {
        console.error(err);
        setErrorMsg(err.message || 'Invalid or expired reset code');
        setStatus('error');
      });
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!oobCode) {
      setErrorMsg('Missing reset code');
      return;
    }
    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      await firebase.auth().confirmPasswordReset(oobCode, newPassword);
      setStatus('success');
      // redirect to sign-in after short delay
      setTimeout(() => history.push(Routes.Signin.path), 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to reset password');
      setStatus('error');
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                {status === 'verifying' && <div className="alert alert-info">Verifying reset link...</div>}
                {status === 'error' && <div className="alert alert-danger">{errorMsg}</div>}
                {status === 'success' && <div className="alert alert-success">Password reset. Redirecting to sign in...</div>}
                {(status === 'ready' || !oobCode) && (
                  <Form onSubmit={handleSubmit}>
                    {email && <div className="mb-2 text-muted">Resetting password for: <strong>{email}</strong></div>}
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : null}
                    <Button variant="primary" type="submit" className="w-100">Reset password</Button>
                  </Form>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
// ...existing code...
