import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

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
  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Daily Equipment Inspection Report</h5>
        <Form>
          <Row>
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
          </Row>
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
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
              <Form.Group id="">
                <Form.Label>Inspected By</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">User 1</option>
                  <option value="1">User 2</option>
                  
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Vehicle</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Vehicle</option>
                  <option value="1">Boom Lift</option>
                  <option value="2">Engine Driven Scissor Lift</option>
                  <option value="3">Telehandler</option>
                  <option value="4">Electric Scissor Lift</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="">
                <Form.Label>Vehicle No.</Form.Label>
                <Form.Control
                  required
                  type="text"
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
          <Form.Group id="leaks">
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
          <Form.Group id="physicalDamage">
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
          <Form.Group id="leaks">
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
          <Form.Group id="physicalDamage">
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
          <Form.Group id="leaks">
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
          <Form.Group id="physicalDamage">
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
          <Form.Group id="leaks">
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
          <Form.Group id="physicalDamage">
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
          <Form.Group id="leaks">
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
              <Form.Group id="notesVI">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Upload</Form.Label>
               
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

export const VM_Form = () => {
  const [dateTime, setDateTime] = useState("");
  console.log(dateTime)
  
  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Vehicle Moving Form</h5>
        <Form>
          <Row>
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
          </Row>
          <Row className="align-items-center">
            <Col md={4} className="mb-4">
              <Form.Group id="datetimeVM">
                <Form.Label>Date & Time</Form.Label>
                <Datetime
                  
                  onChange={setDateTime}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
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
                <Form.Select defaultValue="0">
                  <option value="0">Vehicle</option>
                  <option value="1">Boom Lift</option>
                  <option value="2">Engine Driven Scissor Lift</option>
                  <option value="3">Telehandler</option>
                  <option value="4">Electric Scissor Lift</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-4">
            <Form.Group id="">
                <Form.Label>Vehicle No.</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Vehicle Number"
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
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
            <Form.Group id="dropoffLocation">
                <Form.Label>Dropoff Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <h5 className="my-4">Address</h5>
          <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                />
              </Form.Group>
            </Col>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row> */}
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
  const [dateTime, setDateTime] = useState("");
 
  return (
    <Card border="light" className="mb-4 bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Daily Report</h5>
        <Form>
          <Row>
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
          </Row>
          <Row className="align-items-center">
            <Col md={4} className="mb-4">
              <Form.Group id="datetimeDR">
                <Form.Label>Date & Time</Form.Label>
                <Datetime
                  
                  onChange={setDateTime}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
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
            <Form.Group id="">
                <Form.Label>Weather Details</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="" disabled
                />
              </Form.Group>
            </Col>
            
            <Col md={4} className="mb-4">
              <Form.Group id="">
                <Form.Label>Scope of Work.</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Steel</option>
                  <option value="1">Dry Wall</option>
                  <option value="2">Light Gauge Framing</option>
                  <option value="3">Ceilings</option>
                
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
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-4">
            <Form.Group id="projectLocationDR">
                <Form.Label>Project Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
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
                  as="textarea"
                  rows={3}
                  placeholder=""
                />
              </Form.Group>
            </Col>
          <Col md={6} className="mb-4">
            <Form.Group id="notesDR">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder=""
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


