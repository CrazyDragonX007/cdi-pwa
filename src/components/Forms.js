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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const timestamp = moment().format('MM/DD/YYYY HH:mm:ss');
console.log(timestamp)
require('dotenv').config();
// class WeatherData extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       weatherData: null,
//     };
//   }
//
//   componentDidMount() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7036f0b118db1fe7096dddf444b4a0bb`)
//           .then(response => response.json())
//           .then(data => {
//             console.log("API Response:", data);
//             this.setState({ weatherData: data });
//           })
//
//           .catch(error => {
//             console.error('Error fetching weather data:', error);
//           });
//       }, (error) => {
//         console.error('Error getting geolocation:', error);
//       });
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   } }

  const apiURL = process.env.REACT_APP_BACKEND_URL;
  const getUsers = `${apiURL}/crud/getUsers`;
  const sendEmail = `${apiURL}/send-email`;
  const createVehicleInspectionForm = `${apiURL}/crud/createVehicleInspectionForm`
  const createVehicleMovingForm = `${apiURL}/crud/createVehicleMovingForm`
  const createDailyReports = `${apiURL}/crud/createDailyReports`
  const createProject = `${apiURL}/crud/createProject`
  const weatherAPI = `${apiURL}/crud/weather`
  const createIncidentReportForm =  `${apiURL}/crud/createIncidentReportForm`
  const createTruckInspectionForm = `${apiURL}/crud/createTruckInspectionForm`

const projectList = [
    "Prairie Chapel Church",
    "UPS Warehouse",
    "Robert's Industrial Westgate",
    "Thermal Engineering",
    "Davis Electric",
    "Metro Appliances",
    "Premier Trucking",
    "Prime Hanger"
];

export const VI_Form = () => {
  const [date, setDate] = useState("");
  const [selectedOption01, setSelectedOption01] = useState("0");
  const [selectedOption02, setSelectedOption02] = useState("0");
  const [selectedOption03, setSelectedOption03] = useState("0");
  const [selectedOption04, setSelectedOption04] = useState("0");
  const [selectedOption05, setSelectedOption05] = useState("0");
  const [selectedOption06, setSelectedOption06] = useState("0");
  const [selectedOption07, setSelectedOption07] = useState("0");
  const [selectedOption08, setSelectedOption08] = useState("0");
    const [selectedOption09, setSelectedOption09] = useState("0");
    const [selectedOption10, setSelectedOption10] = useState("0");
    const [selectedOption11, setSelectedOption11] = useState("0");

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
        formData.append('dateTime', timestamp);
        formData.append('vehicleName', e.target.vehicleName.value);
        formData.append('projectName', e.target.projectName.value);
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
        formData.append('notifyTeam', selectedOption11);
      const files = document.getElementById('img01').files;
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
      try {
            const truckNumber = e.target.vehicleNo.value;
          const projectName = e.target.projectName.value;
          console.log(projectName);
          console.log(formData)
        const response = await axios.post(createVehicleInspectionForm, formData);
        // console.log('Form submitted successfully:', response.data.message);
          toast.success('Form submitted successfully!');

          console.log('Email sent successfully');
          if (selectedOption11 === "Yes") {
              await axios.post(sendEmail, {
                  comment: `Equipment Inspection Form Submitted for Truck No. ${truckNumber}`
              });
              console.log('Email sent successfully');
          }

      } catch (error) {
        console.error('Error submitting form:', error);
          toast.error('Error submitting form. Please try again.');
      }
    };
  
  
  return (
      <>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover

          />

    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Daily Equipment Inspection Report</h5>
        <Form onSubmit={handleSubmit}>

          <Row className="align-items-center">
            {/*<Col md={3} className="mb-3">*/}
            {/*  <Form.Group id="dateTime">*/}
            {/*    <Form.Label>Date & Time</Form.Label>*/}
            {/*    <Datetime*/}

            {/*      onChange={setDate}*/}
            {/*      renderInput={(props, openCalendar) => (*/}
            {/*        <InputGroup>*/}
            {/*          <InputGroup.Text>*/}
            {/*            <FontAwesomeIcon icon={faCalendarAlt} />*/}
            {/*          </InputGroup.Text>*/}
            {/*          <Form.Control*/}

            {/*            name="dateTime"*/}
            {/*            type="text"*/}
            {/*            value={date ? moment(date).format("MM/DD/YYYY HH:mm:ss") : ""}*/}
            {/*            placeholder="Enter Date & Time"*/}
            {/*            onFocus={openCalendar}*/}
            {/*            onChange={() => {}}*/}
            {/*          />*/}

            {/*        </InputGroup>*/}


            {/*      )}*/}
            {/*    />*/}
            {/*  </Form.Group>*/}
            {/*</Col>*/}
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
                  <Form.Select defaultValue="Boom Lift" name="vehicleName">

                      <option value="Boom Lift">Boom Lift</option>
                      <option value="Engine Driven Scissor Lift">Engine Driven Scissor Lift</option>
                      <option value="Telehandler">Telehandler</option>
                      <option value="Electric Scissor Lift">Electric Scissor Lift</option>
                      <option value="Others">Others</option>
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
              <Col md={3} className="mb-3">
                  <Form.Group id="projectName">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Select defaultValue={projectList[0]} name="projectName">
                          {projectList.map((projectName, index) => (
                              <option key={index} value={projectName}>
                                  {projectName}
                              </option>
                          ))}
                      </Form.Select>
                  </Form.Group>
              </Col>
          </Row>
            {/*<Row>*/}
            {/*    <Col md={6} className="mb-3">*/}
            {/*        <Form.Group id="pickupJobsite">*/}
            {/*            <Form.Label>Pickup Jobsite</Form.Label>*/}
            {/*            <Form.Control*/}
            {/*                required*/}
            {/*                type="text"*/}
            {/*                name="pickupJobsite"*/}
            {/*                placeholder="Location"*/}
            {/*            />*/}
            {/*        </Form.Group>*/}
            {/*    </Col>*/}
            {/*    <Col md={6} className="mb-3">*/}
            {/*        <Form.Group id="dropoffLocation">*/}
            {/*            <Form.Label>Dropoff Location</Form.Label>*/}
            {/*            <Form.Control*/}
            {/*                required*/}
            {/*                type="text"*/}
            {/*                name="dropoffLocation"*/}
            {/*                placeholder="Location"*/}
            {/*            />*/}
            {/*        </Form.Group>*/}
            {/*    </Col>*/}

            {/*</Row>*/}
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
                  id="yes02"
                  label="Yes"
                  value="0"
                  checked={selectedOption02 === "0"}
                  onChange={(e2) => setSelectedOption02(e2.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option02"
                  id="no02"
                  label="No"
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
                  name="option07"

                  label="Full - 3/4"
                  value="Full - 3/4"
                />
                <Form.Check
                  type="radio"
                  name="option07"

                  label="1/2"
                  value="1/2"
                />
                <Form.Check
                  type="radio"
                  name="option07"

                  label="1/4 or Less"
                  value="1/4 or Less"
                />
                
              </Form.Group>
              
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="parkBrakeCondition">
                <Form.Label>Is the park brake functioning correctly?</Form.Label>
                <Form.Check
                  type="radio"
                  name="option08"
                  id="yes08"
                  label="Yes"
                  value="Yes"
                  
                />
                <Form.Check
                  type="radio"
                  name="option08"
                  id="no08"
                  label="No"
                  value="No"
                  
                  
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
                  name="option09"
                  id="yes09"
                  label="Yes"
                  value="Yes"
                  checked={selectedOption09 === "Yes"}
                  onChange={(e9) => setSelectedOption09(e9.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option09"
                  id="no09"
                  label="No"
                  value="No"
                  checked={selectedOption09 === "No"}
                  onChange={(e9) => setSelectedOption09(e9.target.value)}
                />
              </Form.Group>
              {selectedOption09 === "No" && (
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
                  name="option10"
                  id="yes10"
                  label="Yes"
                  value="Yes"
                  checked={selectedOption10 === "Yes"}
                  onChange={(e10) => setSelectedOption10(e10.target.value)}
              />
                <Form.Check
                  type="radio"
                  name="option10"
                  id="no10"
                  label="No"
                  value="No"
                  checked={selectedOption10 === "No"}
                  onChange={(e10) => setSelectedOption10(e10.target.value)}
                />

              </Form.Group>
              {selectedOption10 === "No" && (
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
                  <Form.Group id="notifyTeam">
                      <Form.Label>Notify Team Members</Form.Label>
                      <Form.Check
                          type="radio"
                          name="option11"
                          id="yes11"
                          label="Yes"
                          value="Yes"
                          checked={selectedOption11 === "Yes"}
                          onChange={(e11) => setSelectedOption11(e11.target.value)}
                      />
                      <Form.Check
                          type="radio"
                          name="option11"
                          id="no11"
                          label="No"
                          value="No"
                          checked={selectedOption11 === "No"}
                          onChange={(e11) => setSelectedOption11(e11.target.value)}
                      />


                  {selectedOption10 === "No" && (
                      <Form.Group>
                          <Form.Label>Please Specify</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                  )}
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
      </>
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
    setDateTime(timestamp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(timestamp)
      const response = await axios.post(createVehicleMovingForm, {
        userID: 1, // Assuming you have a specific user ID
        dateTime: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
        ...formData
      });
      console.log('Response:', response.data);
        toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
        toast.error('Error submitting form. Please try again.');
    }
  };

  return (
      <>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

      />
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
        {/*<Col md={4} className="mb-4">*/}
        {/*<Form.Group id="datetimeVM">*/}
        {/*    <Form.Label>Date & Time</Form.Label>*/}
        {/*    <Datetime*/}
        {/*      onChange={handleDateTimeChange}*/}
        {/*      value={dateTime}*/}
        {/*      renderInput={(props, openCalendar) => (*/}
        {/*        <InputGroup>*/}
        {/*          <InputGroup.Text>*/}
        {/*            <FontAwesomeIcon icon={faCalendarAlt} />*/}
        {/*          </InputGroup.Text>*/}
        {/*          <Form.Control*/}
        {/*            required*/}
        {/*            name="dateTime"*/}
        {/*            type="text"*/}
        {/*            value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}*/}
        {/*            placeholder="Enter Date & Time"*/}
        {/*            onFocus={openCalendar}*/}
        {/*            onChange={() => {}}*/}
        {/*          />*/}
        {/*        </InputGroup>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </Form.Group>*/}
        {/*</Col>*/}
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
    </>
  );
};


export const DR_Form = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [weatherDetails, setWeatherDetails] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    let userLat = userLocation ? userLocation.latitude : null;
    let userLong = userLocation ? userLocation.longitude : null;

    const handleFetchWeather = async () => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const response = await axios.get(`${weatherAPI}?lat=${userLat}&lon=${userLong}`);
            setWeatherData(response.data);
            setWeatherDetails(response.data.weather[0].description);
            console.log(weatherDetails);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        projectName: '',
        // projectLocation: '',
        scopeOfWork: '',
        workPerformed: '',
        notes: ''
    });

    const [dateTime, setDateTime] = useState('');

    const handleDateTimeChange = (timestamp) => {
        setDateTime(timestamp);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if ((formData.notes).length > 0) {
                await axios.post(sendEmail, {
                    comment: `Daily Report submitted by ${formData.firstName} ${formData.lastName}`
                });
            }
            const response = await axios.post(createDailyReports, {
                userID: 1,
                dateTime: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
                ...formData,
                weatherDetails
            });
            console.log('Response:', response.data);
            toast.success('Form submitted successfully!');
        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('Error submitting form. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Card border="light" className="mb-4 bg-white shadow-sm">
                <Card.Body>
                    <h5 className="mb-4">Daily Report</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={3} className="mb-3">
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
                            <Col md={3} className="mb-3">
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

                            {/*<Col md={4} className="mb-4">*/}
                            {/*    <Form.Group id="datetimeDR">*/}
                            {/*        <Form.Label>Date & Time</Form.Label>*/}
                            {/*        <Datetime*/}
                            {/*            onChange={handleDateTimeChange}*/}
                            {/*            value={dateTime}*/}
                            {/*            renderInput={(props, openCalendar) => (*/}
                            {/*                <InputGroup>*/}
                            {/*                    <InputGroup.Text>*/}
                            {/*                        <FontAwesomeIcon icon={faCalendarAlt} />*/}
                            {/*                    </InputGroup.Text>*/}
                            {/*                    <Form.Control*/}
                            {/*                        required*/}
                            {/*                        name="dateTime"*/}
                            {/*                        type="text"*/}
                            {/*                        value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}*/}
                            {/*                        placeholder="Enter Date & Time"*/}
                            {/*                        onFocus={openCalendar}*/}
                            {/*                        onChange={() => {}}*/}
                            {/*                    />*/}
                            {/*                </InputGroup>*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Col>*/}
                            <Col md={3} className="mb-4">
                                <Form.Group id="weatherDetails" className="position-relative">
                                    <Form.Label>Weather Details</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            required
                                            name="weatherDetails"
                                            type="text"
                                            onChange={handleChange}
                                            value={weatherDetails}
                                            placeholder=""
                                            disabled
                                        />
                                        <Button
                                            variant="link"
                                            onClick={handleFetchWeather}
                                            disabled={isFetching}
                                            className="position-absolute end-0"
                                            style={{ right: '10px' }}
                                        >
                                            {isFetching ? 'Fetching...' : 'Fetch Data'}
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={3} className="mb-4">
                                <Form.Group id="scopeOfWork">
                                    <Form.Label>Scope of Work</Form.Label>
                                    <Form.Select
                                        name="scopeOfWork"
                                        value={formData.scopeOfWork}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Scope of Work</option>
                                        <option value="Structural Steel">Structural Steel</option>
                                        <option value="PEMB">PEMB</option>
                                        <option value="Drywall">Drywall</option>
                                        <option value="Light Gauge Framing">Light Gauge Framing</option>
                                        <option value="Ceilings">Ceilings</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className="mb-4">
                                <Form.Group id="projectName">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Select
                                        required
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Project</option>
                                        {projectList.map((project, index) => (
                                            <option key={index} value={project}>
                                                {project}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {/*<Col md={4} className="mb-4">*/}
                            {/*    <Form.Group id="projectLocationDR">*/}
                            {/*        <Form.Label>Project Location</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            required*/}
                            {/*            name="projectLocation"*/}
                            {/*            type="text"*/}
                            {/*            placeholder=""*/}
                            {/*            value={formData.projectLocation}*/}
                            {/*            onChange={handleChange}*/}
                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Col>*/}
                            <Col md={4} className="mb-4">
                                <Form.Group id="uploadImageObjectDR">
                                    <Form.Label>Upload Attachments</Form.Label>
                                    <br/>
                                    <input type="file" id="imgDR" multiple/>
                                    <div className="d-md-block text-start">
                                        <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                                    </div>
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
        </>
    );
};

export const IR_Form = () => {
    const [dateTime, setDateTime] = useState('');
    const [empDateTime, setempDateTime] = useState('');
    const [supDateTime, setsupDateTime] = useState('');

    const [formData, setFormData] = useState({
        incidentType: '', // Changed from vehicleName
        location: '', // Changed from firstName
        name: '', // Added for person completing the report
        peopleInvolved: '', // Changed from lastName
        vehicle: '', // Changed from vehicleName
        vehicleNo: '',
        pickupLocation: '', // Changed from pickupJobsite
        dropoffLocation: '',
        unsafeAct: '', // Changed from notes for unsafe act
        description: '', // Changed from notes for description of event
        employeeSign: '', // Added for employee signature
        employeeSignDate: '', // Added for employee signature date
        // supervisorSign: '', // Added for supervisor signature
        // supervisorSignDate: '' // Added for supervisor signature date
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateTimeChange = (date) => {
        setDateTime(date);
    };

    const handleEmpDateTimeChange = (date) => {
        setempDateTime(date);
    };

    const handleSupDateTimeChange = (date) => {
        setsupDateTime(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(createIncidentReportForm, {
                ...formData,
                dateTime: moment(dateTime).format("YYYY-MM-DD HH:mm:ss"),
                employeeSignDate: moment(empDateTime).format("YYYY-MM-DD HH:mm:ss"),
                // supervisorSignDate: moment(supDateTime).format("YYYY-MM-DD HH:mm:ss")
            });
            console.log('Response:', response.data);
            console.log('toast')
            toast.success('Form submitted successfully!');

            await axios.post(sendEmail, {
                    comment: `Incident Report Form Submitted by ${formData.employeeSign}`
                });
            console.log('Email sent successfully');

        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('Error submitting form. Please try again.');
        }
    };

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

        />
        <Card border="light" className="mb-4 bg-white shadow-sm">
            <Card.Body>
                <h5 className="mb-4">Incident Report Form</h5>
                <Form onSubmit={handleSubmit}>
                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Group id="incidentType">
                                <Form.Label>Documenting an:</Form.Label>
                                <Form.Select
                                    name="incidentType"
                                    value={formData.incidentType}
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
                            <Form.Group id="location">
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control
                                    required
                                    name="location"
                                    type="text"
                                    placeholder="Enter the location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="name">
                                <Form.Label>Person Completing Report</Form.Label>
                                <Form.Control
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="Enter your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="peopleInvolved">
                                <Form.Label>People Involved</Form.Label>
                                <Form.Control
                                    required
                                    name="peopleInvolved"
                                    type="text"
                                    placeholder="List all the people"
                                    value={formData.peopleInvolved}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
      <Row className="align-items-center">
        <Col md={4} className="mb-4">
        <Form.Group id="dateTime">
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
          <Form.Group id="vehicle">
            <Form.Label>Vehicle</Form.Label>
              <Form.Select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
              >
                  <option value="">Vehicle</option>
                  <option value="Boom Lift">Boom Lift</option>
                  <option value="Engine Driven Scissor Lift">Engine Driven Scissor Lift</option>
                  <option value="Telehandler">Telehandler</option>
                  <option value="Electric Scissor Lift">Electric Scissor Lift</option>
                  <option value="Others">Others</option>
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
          <Form.Group id="pickupLocation">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              required
              name="pickupLocation"
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
          <Form.Group id="unsafeAct">
            <Form.Label>Was this event caused by an unsafe act (activity or movement) or an unsafe condition (machinery or weather) ?</Form.Label>
            <Form.Control
              required
              name="unsafeAct"
              as="textarea"
              rows={3}
              value={formData.unsafeAct}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="description">
            <Form.Label>Description of Event (Describe sequence of events and tasks being performed)</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        
      </Row>
      <Row>
      <Col md={6} className="mb-3">
          <Form.Group id="employeeSign">
            <Form.Label>Employee Signature</Form.Label>
            <Form.Control
              required
              name="employeeSign"
              type="text"
              placeholder="Enter your Full Name"
              value={formData.employeeSign}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
        <Form.Group id="employeeSignDate">
            <Form.Label>Date & Time</Form.Label>
            <Datetime
              onChange={handleEmpDateTimeChange}
              value={empDateTime}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    name="employeeSignDate"
                    type="text"
                    value={empDateTime ? moment(empDateTime).format("MM/DD/YYYY HH:mm:ss") : ""}
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
      {/*<Row>*/}
      
      {/*  <Col md={6} className="mb-3">*/}
      {/*    <Form.Group id="supervisorSign">*/}
      {/*      <Form.Label>Supervisor Signature</Form.Label>*/}
      {/*      <Form.Control*/}
      {/*        required*/}
      {/*        name="supervisorSign"*/}
      {/*        type="text"*/}
      {/*        placeholder="Enter your Full Name"*/}
      {/*        value={formData.supervisorSign}*/}
      {/*        onChange={handleChange}*/}
      {/*      />*/}
      {/*    </Form.Group>*/}
      {/*  </Col>*/}
      {/*  <Col md={6} className="mb-3">*/}
      {/*  <Form.Group id="supervisorSignDate">*/}
      {/*      <Form.Label>Date & Time</Form.Label>*/}
      {/*      <Datetime*/}
      {/*        onChange={handleSupDateTimeChange}*/}
      {/*        value={supDateTime}*/}
      {/*        renderInput={(props, openCalendar) => (*/}
      {/*          <InputGroup>*/}
      {/*            <InputGroup.Text>*/}
      {/*              <FontAwesomeIcon icon={faCalendarAlt} />*/}
      {/*            </InputGroup.Text>*/}
      {/*            <Form.Control*/}
      {/*              required*/}
      {/*              name="supervisorSignDate"*/}
      {/*              type="text"*/}
      {/*              value={supDateTime ? moment(supDateTime).format("MM/DD/YYYY HH:mm:ss") : ""}*/}
      {/*              placeholder="Enter Date & Time"*/}
      {/*              onFocus={openCalendar}*/}
      {/*              onChange={() => {}}*/}
      {/*            />*/}
      {/*          </InputGroup>*/}
      {/*        )}*/}
      {/*      />*/}
      {/*    </Form.Group>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <div className="mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </div>
    </Form>
      </Card.Body>
    </Card>

        </>
  );
};


export const TI_Form = () => {
    const [dateTime, setDateTime] = useState('');
    const [formData, setFormData] = useState({
        truckNo: '',
        mileage: '',
        engineOil: '',
        antiFreeze: '',
        powerSteering: '',
        transmission: '',
        washer: '',
        gpsHolder: '',
        insuranceReg: '',
        backupAlarm: '',
        fireExt: '',
        horn: '',
        allGlass: '',
        mirrors: '',
        tirePSI: '',
        headLights: '',
        parkLights: '',
        flasher: '',
        strobeLights: '',
        workLights: '',
        fourStraps: '',
        tommyGate: '',
        trailerTowed: '',
        drainAirtanks: '',
        dashboardClear: '',
        policyAck: '',
        signName: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateTimeChange = (timestamp) => {
        setDateTime(timestamp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(createTruckInspectionForm, {
                ...formData,
                dateTime: moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
            });
            console.log('Response:', response.data);
            toast.success('Truck inspection form submitted successfully!');
            if (formData.policyAck === "Yes") {
                await axios.post(sendEmail, {
                    comment: `Form Submitted for ${formData.truckNo}`
                });
                console.log('Email sent successfully');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('Error submitting form. Please try again.');
        }
    };

    const renderRadioGroup = (name, label) => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <div>
                <Form.Check
                    inline
                    type="radio"
                    label="Ok"
                    name={name}
                    value="Ok"
                    checked={formData[name] === "Ok"}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="Added"
                    name={name}
                    value="Added"
                    checked={formData[name] === "Added"}
                    onChange={handleChange}
                />
            </div>
        </Form.Group>
    );

    const renderRadioGroup2 = (name, label) => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <div>
                <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name={name}
                    value="Yes"
                    checked={formData[name] === "Yes"}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name={name}
                    value="No"
                    checked={formData[name] === "No"}
                    onChange={handleChange}
                />
            </div>
        </Form.Group>
    );

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <Card border="light" className="mb-4 bg-white shadow-sm">
                <Card.Body>
                    <h5 className="mb-4">Truck Inspection Form</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Truck Number</Form.Label>
                                    <Form.Control
                                        required
                                        name="truckNo"
                                        type="text"
                                        placeholder="Enter truck number"
                                        value={formData.truckNo}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Mileage</Form.Label>
                                    <Form.Control
                                        required
                                        name="mileage"
                                        type="text"
                                        placeholder="Enter mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            {/*<Col md={4} className="mb-3">*/}
                            {/*    <Form.Group>*/}
                            {/*        <Form.Label>Date & Time</Form.Label>*/}
                            {/*        <Datetime*/}
                            {/*            onChange={handleDateTimeChange}*/}
                            {/*            value={dateTime}*/}
                            {/*            renderInput={(props, openCalendar) => (*/}
                            {/*                <InputGroup>*/}
                            {/*                    <InputGroup.Text>*/}
                            {/*                        <FontAwesomeIcon icon={faCalendarAlt} />*/}
                            {/*                    </InputGroup.Text>*/}
                            {/*                    <Form.Control*/}
                            {/*                        required*/}
                            {/*                        type="text"*/}
                            {/*                        value={dateTime ? moment(dateTime).format("MM/DD/YYYY HH:mm:ss") : ""}*/}
                            {/*                        placeholder="Enter Date & Time"*/}
                            {/*                        onFocus={openCalendar}*/}
                            {/*                        onChange={() => {}}*/}
                            {/*                    />*/}
                            {/*                </InputGroup>*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Col>*/}
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("engineOil", "Engine Oil")}</Col>
                            <Col md={4}>{renderRadioGroup("antiFreeze", "Anti-Freeze")}</Col>
                            <Col md={4}>{renderRadioGroup("powerSteering", "Power Steering")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("transmission", "Transmission")}</Col>
                            <Col md={4}>{renderRadioGroup("washer", "Washer")}</Col>
                            <Col md={4}>{renderRadioGroup("gpsHolder", "GPS Holder")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("insuranceReg", "Insurance/Registration")}</Col>
                            <Col md={4}>{renderRadioGroup("backupAlarm", "Backup Alarm")}</Col>
                            <Col md={4}>{renderRadioGroup("fireExt", "Fire Extinguisher")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("horn", "Horn")}</Col>
                            <Col md={4}>{renderRadioGroup("allGlass", "All Glass")}</Col>
                            <Col md={4}>{renderRadioGroup("mirrors", "Mirrors")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("tirePSI", "Tire PSI")}</Col>
                            <Col md={4}>{renderRadioGroup("headLights", "Head Lights")}</Col>
                            <Col md={4}>{renderRadioGroup("parkLights", "Park Lights")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("flasher", "Flasher")}</Col>
                            <Col md={4}>{renderRadioGroup("strobeLights", "Strobe Lights")}</Col>
                            <Col md={4}>{renderRadioGroup("workLights", "Work Lights")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("fourStraps", "Four Straps")}</Col>
                            <Col md={4}>{renderRadioGroup("tommyGate", "Tommy Gate")}</Col>
                            <Col md={4}>{renderRadioGroup("trailerTowed", "Check all Doors")}</Col>
                        </Row>

                        <Row>
                            <Col md={4}>{renderRadioGroup("drainAirtanks", "Drain Air Tanks")}</Col>
                            <Col md={4}>{renderRadioGroup("dashboardClear", "Dashboard Clear")}</Col>
                            <Col md={4}>{renderRadioGroup2("policyAck", "Notify Team Members")}</Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control
                                        name="notes"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter any additional notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Sign Name</Form.Label>
                                    <Form.Control
                                        required
                                        name="signName"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={formData.signName}
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
        </>
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

export const Contract_Drawing_Form = (props) => {
    const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    isContract: 'contract'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let url = process.env.REACT_APP_BACKEND_URL+'/crud';
        let nameType = '';
        if(formData.isContract ==='contract'){
            url+='/createContract';
            nameType = 'contractName';
        }else if(formData.isContract ==='drawing'){
            url+='/createDrawing';
            nameType = 'drawingName';
        }else{
            url+='/createMiscellaneousFile';
            nameType = 'miscellaneousFileName';
        }
        const finalFormData = new FormData();
        finalFormData.append('projectID',props.projectID);
        finalFormData.append(nameType, formData.name);
        finalFormData.append('file', document.getElementById('img01').files[0]);
      const response = await axios.post(url, finalFormData);
      console.log('Response:', response.data);
      // history.goBack()
        props.closeModal()

    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="name">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Enter the file name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group id="isContract">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="isContract"
              value={formData.isContract}
              onChange={handleChange}
            >
              <option value='contract'>Contract</option>
              <option value='drawing'>Drawing</option>
                <option value='miscellaneous'>Miscellaneous</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md = {6} className="mb-3">
        <Form.Group id="uploadImageObjectVI">
                    <Form.Label>Upload Attachments</Form.Label>
                    <br/>
                    <input type="file" id="img01"/>
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