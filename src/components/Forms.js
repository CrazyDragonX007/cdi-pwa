import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

import axios from "axios";
import Contracts from "../pages/ProjectDetails";
import {useHistory, Redirect} from "react-router-dom";

class WeatherData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7036f0b118db1fe7096dddf444b4a0bb`)
          .then(response => response.json())
          .then(data => {
            console.log("API Response:", data);
            this.setState({ weatherData: data });
          })
          
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  } }

  const apiURL = 'http://localhost:8000';
  const getUsers = `${apiURL}/crud/getUsers`;
  const createVehicleInspectionForm = `${apiURL}/crud/createVehicleInspectionForm`
  const createVehicleMovingForm = `${apiURL}/crud/createVehicleMovingForm`
  const createDailyReports = `${apiURL}/crud/createDailyReports`
  const createProject = `${apiURL}/crud/createProject`

export const VI_Form = () => {
  const [date, setDate] = useState("");
  console.log(date)
  const [selectedOption01, setSelectedOption01] = useState("0");
  const [selectedOption02, setSelectedOption02] = useState("0");
  const [selectedOption03, setSelectedOption03] = useState("0");
  const [selectedOption04, setSelectedOption04] = useState("0");
  const [selectedOption05, setSelectedOption05] = useState("0");
  const [selectedOption06, setSelectedOption06] = useState("0");
  const [selectedOption07, setSelectedOption07] = useState("0");
  const [selectedOption08, setSelectedOption08] = useState("0");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch(getUsers)
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []); 

    const handleSubmit = async (e) => {
      e.preventDefault();
        const formData = new FormData();
        formData.append('dateTime', date);
        formData.append('vehicleName', e.target.vehicleName.value);
        formData.append('vehicleNo', e.target.vehicleNo.value);
        formData.append('inspectedBy', e.target.inspectedBy.value);
        formData.append('physicalDamage', selectedOption01);
        formData.append('leakStatus', selectedOption02);
        formData.append('lhaCondition', selectedOption03);
        formData.append('safetyDevicesCondition', selectedOption04);
        formData.append('up_lowEmergencyControls', selectedOption05);
        formData.append('oilCapacity', selectedOption06);
        formData.append('safetyWarningDecalsCondition', selectedOption07);
        formData.append('parkBrakeCondition', selectedOption08);
        formData.append('notes', e.target.notes.value);
      const files = document.getElementById('img01').files;
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
      try {
        const response = await axios.post(createVehicleInspectionForm, formData);
        console.log('Form submitted successfully:', response.data.message);
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
  
  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Daily Equipment Inspection Report</h5>
        <Form onSubmit={handleSubmit}>
          {/* <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your last name"
                />
              </Form.Group>
            </Col>
          </Row> */}
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="dateTime">
                <Form.Label>Date & Time</Form.Label>
                <Datetime
                  
                  onChange={setDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        name="dateTime"
                        type="text"
                        value={date ? moment(date).format("MM/DD/YYYY HH:mm:ss") : ""}
                        placeholder="Enter Date & Time"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                     
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
            <Form.Group id="inspectedBy">
              <Form.Label>Inspected By</Form.Label>
              <Form.Select defaultValue="0" name = "inspectedBy">
              {users.map((user) => (
                  <option key={user.user_id} value={`${user.firstName} ${user.lastName}`}>{user.firstName} {user.lastName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="vehicleName">
                <Form.Label>Vehicle</Form.Label>
                <Form.Select defaultValue="0" name="vehicleName">
                  <option value="0">Vehicle</option>
                  <option value="1">Boom Lift</option>
                  <option value="2">Engine Driven Scissor Lift</option>
                  <option value="3">Telehandler</option>
                  <option value="4">Electric Scissor Lift</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="vehicleNo">
                <Form.Label>Vehicle No.</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="vehicleNo"
                  placeholder="Vehicle Number"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col md={6} className="mb-3">
          <Form.Group id="physicalDamage">
                <Form.Label>Is there any new physical or mechanical damage or missing pieces to the unit?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option01"
                  id="no01"
                  label="No"
                  value="0"
                  checked={selectedOption01 === "0"}
                  onChange={(e1) => setSelectedOption01(e1.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option01"
                  id="yes01"
                  label="Yes"
                  value="1"
                  checked={selectedOption01 === "1"}
                  onChange={(e1) => setSelectedOption01(e1.target.value)}
                />
              </Form.Group>
              {selectedOption01 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="safetyDevicesCondition">
                <Form.Label>Are the safety devices present and functioning properly? (seat belts, safety gates/chains/bars)</Form.Label>
                <Form.Check
                  type="radio"
                  name="option02"
                  id="no02"
                  label="No"
                  value="0"
                  checked={selectedOption02 === "0"}
                  onChange={(e2) => setSelectedOption02(e2.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option02"
                  id="yes02"
                  label="Yes"
                  value="1"
                  checked={selectedOption02 === "1"}
                  onChange={(e2) => setSelectedOption02(e2.target.value)}
                />
              </Form.Group>
              {selectedOption02 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          </Row>
          <Row>
          <Col md={6} className="mb-3">
          <Form.Group id="cleanStatus">
                <Form.Label>Is the unit in a clean state and free from personal items, trash and debris?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option03"
                  id="yes03"
                  label="Yes"
                  value="0"
                  checked={selectedOption03 === "0"}
                  onChange={(e3) => setSelectedOption03(e3.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option03"
                  id="no03"
                  label="No"
                  value="1"
                  checked={selectedOption03 === "1"}
                  onChange={(e3) => setSelectedOption03(e3.target.value)}
                />
              </Form.Group>
              {selectedOption03 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="oilStatus">
                <Form.Label>Does the unit have sufficient oil?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option04"
                  id="yes04"
                  label="Yes"
                  value="0"
                  checked={selectedOption04 === "0"}
                  onChange={(e4) => setSelectedOption04(e4.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option04"
                  id="no04"
                  label="No"
                  value="1"
                  checked={selectedOption04 === "1"}
                  onChange={(e4) => setSelectedOption04(e4.target.value)}
                />
              </Form.Group>
              {selectedOption04 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          </Row>
          <Row>
          <Col md={6} className="mb-3">
          <Form.Group id="lhaCondition">
                <Form.Label>Are the lights, horn and alarms in good working order?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option05"
                  id="yes05"
                  label="Yes"
                  value="0"
                  checked={selectedOption05 === "0"}
                  onChange={(e5) => setSelectedOption05(e5.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option05"
                  id="no05"
                  label="No"
                  value="1"
                  checked={selectedOption05 === "1"}
                  onChange={(e5) => setSelectedOption05(e5.target.value)}
                />
              </Form.Group>
              {selectedOption05 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="leakStatus">
                <Form.Label>Does the unit appear to have any leaks?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option06"
                  id="no06"
                  label="No"
                  value="0"
                  checked={selectedOption06 === "0"}
                  onChange={(e6) => setSelectedOption06(e6.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option06"
                  id="yes06"
                  label="Yes"
                  value="1"
                  checked={selectedOption06 === "1"}
                  onChange={(e6) => setSelectedOption06(e6.target.value)}
                />
              </Form.Group>
              {selectedOption06 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          </Row>
          <Row>
          <Col md={6} className="mb-3">
          <Form.Group id="oilCapacity">
                <Form.Label>What is the fuel level? (if applicable)</Form.Label>
                <Form.Check
                  type="radio"
                  name="option08"
                  id="full"
                  label="Full - 3/4"
                  value="0"
                />
                <Form.Check
                  type="radio"
                  name="option08"
                  id="half"
                  label="1/2"
                  value="1"  
                />
                <Form.Check
                  type="radio"
                  name="option08"
                  id="less"
                  label="1/4 or Less"
                  value="1" 
                />
                
              </Form.Group>
              
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="parkBrakeCondition">
                <Form.Label>Is the park brake functioning correctly?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option07"
                  id="yes07"
                  label="Yes"
                  value="0"
                  
                />
                <Form.Check
                  type="radio"
                  name="option07"
                  id="no07"
                  label="No"
                  value="1"
                  
                  
                />
              </Form.Group>
              
          </Col>
          </Row>
          <Row>
          <Col md={6} className="mb-3">
          <Form.Group id="up_lowEmergencyControls">
                <Form.Label>Are all the operating upper/lower and emergency controls functioning properly?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option07"
                  id="yes07"
                  label="Yes"
                  value="0"
                  checked={selectedOption07 === "0"}
                  onChange={(e7) => setSelectedOption07(e7.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option07"
                  id="no07"
                  label="No"
                  value="1"
                  checked={selectedOption07 === "1"}
                  onChange={(e7) => setSelectedOption07(e7.target.value)}
                />
              </Form.Group>
              {selectedOption07 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="safetyWarningDecalsCondition">
                <Form.Label>Is the operators manual,safety,warning decals and capacity plate onboard and legible?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option08"
                  id="no08"
                  label="No"
                  value="0"
                  checked={selectedOption08 === "0"}
                  onChange={(e8) => setSelectedOption08(e8.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option08"
                  id="yes08"
                  label="Yes"
                  value="1"
                  checked={selectedOption08 === "1"}
                  onChange={(e8) => setSelectedOption08(e8.target.value)}
                />
              </Form.Group>
              {selectedOption08 === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
                <Form.Group id="uploadImageObjectVI">
                    <Form.Label>Upload Attachments</Form.Label>
                    <br/>
                    <input type="file" id="img01" multiple/>
                    <div className="d-md-block text-start">
                        {/*<div className="fw-normal text-dark mb-1">Choose Image</div>*/}
                        <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                    </div>
                </Form.Group>
            </Col>
              <Col md={6} className="mb-3">
                  <Form.Group id="notesVI">

                      <Form.Label>Notes</Form.Label>
                      <Form.Control
                          required
                          name="notes"
                          as="textarea"
                          rows={5}
                />
            </Form.Group>
            </Col>
          </Row>

          
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {formSubmitted && <p className="mt-3">Form submitted successfully!</p>}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


export const VM_Form = () => {
  const [dateTime, setDateTime] = useState('');
  // console.log(dateTime)
  
  const [formData, setFormData] = useState({
    userID: 1, // Assuming this is the user ID
    firstName: '',
    lastName: '',
    vehicleName: '',
    vehicleNo: '',
    pickupJobsite: '',
    dropoffLocation: '',
    notes: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateTimeChange = (date) => {
    setDateTime(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createVehicleMovingForm, {
        userID: 1, // Assuming you have a specific user ID
        dateTime: moment(dateTime).format("YYYY-MM-DD HH:mm:ss"),
        ...formData
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Vehicle Moving Form</h5>
        <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={4} className="mb-4">
        <Form.Group id="datetimeVM">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleDateTimeChange}
              value={dateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="dateTime"
                    type="text"
                    value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
                    placeholder="Enter Date & Time"
                    onFocus={openCalendar}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="gender">
            <Form.Label>Vehicle</Form.Label>
            <Form.Select
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
            >
              <option value="">Vehicle</option>
              <option value="Boom Lift">Boom Lift</option>
              <option value="Engine Driven Scissor Lift">Engine Driven Scissor Lift</option>
              <option value="Telehandler">Telehandler</option>
              <option value="Electric Scissor Lift">Electric Scissor Lift</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="vehicleNo">
            <Form.Label>Vehicle No.</Form.Label>
            <Form.Control
              required
              name="vehicleNo"
              type="text"
              placeholder="Vehicle Number"
              value={formData.vehicleNo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="pickupJobsite">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              required
              name="pickupJobsite"
              type="text"
              placeholder="Enter your home address"
              value={formData.pickupJobsite}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="dropoffLocation">
            <Form.Label>Dropoff Location</Form.Label>
            <Form.Control
              required
              name="dropoffLocation"
              type="text"
              placeholder="Enter your home address"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-3">
          <Form.Group id="notesVM">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              required
              name="notes"
              as="textarea"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </div>
    </Form>
      </Card.Body>
    </Card>
  );
};


export const DR_Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    projectName: '',
    projectLocation: '',
    scopeOfWork: '',
    workPerformed: '',
    weatherDetails: '',
    notes: ''
  });
  const [dateTime, setDateTime] = useState('');

  const handleDateTimeChange = (date) => {
    setDateTime(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createDailyReports, {
        userID: 1, // Assuming you have a specific user ID
        dateTime: moment(dateTime).format("YYYY-MM-DD HH:mm:ss"),
        ...formData
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Daily Report</h5>
        <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={4} className="mb-4">
          <Form.Group id="datetimeDR">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleDateTimeChange}
              value={dateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="dateTime"
                    type="text"
                    value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
                    placeholder="Enter Date & Time"
                    onFocus={openCalendar}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="weatherDetails">
            <Form.Label>Weather Details</Form.Label>
            <Form.Control
              required
              name="weatherDetails"
              type="text"
              placeholder=""
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="scopeOfWork">
            <Form.Label>Scope of Work</Form.Label>
            <Form.Select
              name="scopeOfWork"
              value={formData.scopeOfWork}
              onChange={handleChange}
            >
              <option value="">Select Scope of Work</option>
              <option value="Steel">Steel</option>
              <option value="Dry Wall">Dry Wall</option>
              <option value="Light Gauge Framing">Light Gauge Framing</option>
              <option value="Ceilings">Ceilings</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Form.Group id="projectNameDR">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              required
              name="projectName"
              type="text"
              placeholder=""
              value={formData.projectName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-4">
          <Form.Group id="projectLocationDR">
            <Form.Label>Project Location</Form.Label>
            <Form.Control
              required
              name="projectLocation"
              type="text"
              placeholder=""
              value={formData.projectLocation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Form.Group id="workPerformedDR">
            <Form.Label>Work Performed</Form.Label>
            <Form.Control
              required
              name="workPerformed"
              as="textarea"
              rows={3}
              placeholder=""
              value={formData.workPerformed}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-4">
          <Form.Group id="notesDR">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              required
              name="notes"
              as="textarea"
              rows={3}
              placeholder=""
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
      </Card.Body>
    </Card>
  );
};

export const IR_Form = () => {
  const [dateTime, setDateTime] = useState('');
  // console.log(dateTime)
  
  const [formData, setFormData] = useState({
    userID: 1, // Assuming this is the user ID
    firstName: '',
    lastName: '',
    vehicleName: '',
    vehicleNo: '',
    pickupJobsite: '',
    dropoffLocation: '',
    notes: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateTimeChange = (date) => {
    setDateTime(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createVehicleMovingForm, {
        userID: 1, // Assuming you have a specific user ID
        dateTime: moment(dateTime).format("YYYY-MM-DD HH:mm:ss"),
        ...formData
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Incident Report Form</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md = {6} className="mb-3">
            <Form.Group id="gender">
              <Form.Label>Documenting an:</Form.Label>
                <Form.Select
                  name="vehicleName"
                  value={formData.vehicleName}
                  onChange={handleChange}
                >
                  <option value="Lost Time/Injury">Lost Time/Injury</option>
                  <option value="First Aid">First Aid</option>
                  <option value="Incident">Incident</option>
                  <option value="Close Call">Close Call</option>
                  <option value="Observation">Observation</option>
                  <option value="Other">Other</option>
                </Form.Select>
            </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  type="text"
                  placeholder="Enter the location"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
        </Col>
          </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="firstName">
            <Form.Label>Person Completing Report</Form.Label>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="Enter your Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="lastName">
            <Form.Label>People Involved</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="List all the people"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={4} className="mb-4">
        <Form.Group id="datetimeVM">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleDateTimeChange}
              value={dateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="dateTime"
                    type="text"
                    value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
                    placeholder="Enter Date & Time"
                    onFocus={openCalendar}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="gender">
            <Form.Label>Vehicle</Form.Label>
            <Form.Select
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
            >
              <option value="">Vehicle</option>
              <option value="Boom Lift">Boom Lift</option>
              <option value="Engine Driven Scissor Lift">Engine Driven Scissor Lift</option>
              <option value="Telehandler">Telehandler</option>
              <option value="Electric Scissor Lift">Electric Scissor Lift</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-4">
          <Form.Group id="vehicleNo">
            <Form.Label>Vehicle No.</Form.Label>
            <Form.Control
              required
              name="vehicleNo"
              type="text"
              placeholder="Vehicle Number"
              value={formData.vehicleNo}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="pickupJobsite">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              required
              name="pickupJobsite"
              type="text"
              placeholder="Enter your home address"
              value={formData.pickupJobsite}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="dropoffLocation">
            <Form.Label>Dropoff Location</Form.Label>
            <Form.Control
              required
              name="dropoffLocation"
              type="text"
              placeholder="Enter your home address"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col md={6} className="mb-3">
          <Form.Group id="notesVM">
            <Form.Label>Was this event caused by an unsafe act (activity or movement) or an unsafe condition (machinery or weather) ?</Form.Label>
            <Form.Control
              required
              name="notes"
              as="textarea"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="notesVM">
            <Form.Label>Description of Event (Describe sequence of events and tasks being performed)</Form.Label>
            <Form.Control
              required
              name="notes"
              as="textarea"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        
      </Row>
      <Row>
      <Col md={6} className="mb-3">
          <Form.Group id="empSign">
            <Form.Label>Employee Signature</Form.Label>
            <Form.Control
              required
              name="empSign"
              type="text"
              placeholder="Enter your Full Name"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
        <Form.Group id="datetimeVM">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleDateTimeChange}
              value={dateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="dateTime"
                    type="text"
                    value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
                    placeholder="Enter Date & Time"
                    onFocus={openCalendar}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      
        <Col md={6} className="mb-3">
          <Form.Group id="supSign">
            <Form.Label>Supervisor Signature</Form.Label>
            <Form.Control
              required
              name="supSign"
              type="text"
              placeholder="Enter your Full Name"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
        <Form.Group id="datetimeVM">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleDateTimeChange}
              value={dateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="dateTime"
                    type="text"
                    value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
                    placeholder="Enter Date & Time"
                    onFocus={openCalendar}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </div>
    </Form>
      </Card.Body>
    </Card>
  );
};

export const Project_Form = () => {
    const [projectId,setProjectId] = useState();
  const [projectName, setProjectName] = useState('');
  const [projectStatus, setProjectStatus] = useState('Active');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        projectName,
      projectStatus
    }
    try {
      const response = await axios.post(createProject, formData);
      setProjectId(response.data.projectID);
      setRedirect(true);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

if (redirect){
    const project = {
        projectId: projectId,
        projectName: projectName,
        projectStatus: projectStatus
    }
  return  <Redirect to={{
    pathname: '/projectdetails',
    state: { project: project }
}}
/>; 
}
  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        {/* <h5 className="mb-4">Vehicle Moving Form</h5> */}
        <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                          required
                          name="projectName"
                          type="text"
                          placeholder="Enter the Project name"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="projectStatus">
                        <Form.Label>Project Status</Form.Label>
                        <Form.Select
                          name="projectStatus"
                          value={projectStatus}
                          onChange={(e)=>setProjectStatus(e.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Hold">Hold</option>
                          <option value="Completed">Completed</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="mt-3">
                    <Button variant="primary" type="submit">
                      Create Project
                    </Button> 
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const Contract_Drawing_Form = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectStatus: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/createProject', formData);
      console.log('Response:', response.data);
      // Optionally, reset form fields after successful submission
      setFormData({
        projectName: '',
        projectStatus: 'Active'
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="projectName">
            <Form.Label>Contract/Drawing Name</Form.Label>
            <Form.Control
              required
              name="projectName"
              type="text"
              placeholder="Enter the Contract/Drawing name"
              value={formData.projectName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="projectStatus">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
            >
              <option value="Active">Contract</option>
              <option value="Hold">Drawing</option>
              
            </Form.Select>
          </Form.Group>
        </Col>
        
      </Row>
      <Row>
        <Col md = {6} className="mb-3">
        <Form.Group id="uploadImageObjectVI">
                    <Form.Label>Upload Attachments</Form.Label>
                    <br/>
                    <input type="file" id="img01" multiple/>
                    <div className="d-md-block text-start">
                        {/*<div className="fw-normal text-dark mb-1">Choose Image</div>*/}
                        <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                    </div>
                    </Form.Group>
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </div>
    </Form>
  );
};