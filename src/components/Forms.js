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
  const [selectedOption, setSelectedOption] = useState("0");
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
                  name="option"
                  id="no"
                  label="No"
                  value="0"
                  checked={selectedOption === "0"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option"
                  id="yes"
                  label="Yes"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </Form.Group>
              {selectedOption === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          <Col md={6} className="mb-3">
          <Form.Group id="physicalDamage">
                <Form.Label>Does the unit appear to have any leaks? (fuel,oil, hydraulic, coolant)</Form.Label>
                <Form.Check
                  type="radio"
                  name="option"
                  id="no"
                  label="No"
                  value="0"
                  checked={selectedOption === "0"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="option"
                  id="yes"
                  label="Yes"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </Form.Group>
              {selectedOption === "1" && (
                <Form.Group>
                  <Form.Label>Please Specify</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              )}
          </Col>
          </Row>
          <Row>
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
          </Row>

          <h5 className="my-4">Address</h5>
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
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save All
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


