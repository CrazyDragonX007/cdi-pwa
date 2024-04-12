
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import S3FileList from "./S3FileList";
import axios from 'axios'; 
import moment from 'moment';
import ExportCSV from "./ExportToCSV";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

const apiURL = process.env.REACT_APP_BACKEND_URL;
const getVehicleMovingFormUrl = `${apiURL}/crud/getVehicleMovingForm`;
const getVehicleInspectionFormUrl = `${apiURL}/crud/getVehicleInspectionForm`;
const getDailyReports = `${apiURL}/crud/getDailyReports`
const getProjects = `${apiURL}/crud/getProjects`
const getContracts = `${apiURL}/crud/getContracts`
const getDrawings = `${apiURL}/crud/getDrawings`

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};



export const VIFTable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [folderUrl, setFolderUrl] = useState('');
  const [headers, setHeaders] = useState([]);

  // const headers = Object.keys(forms[0]);
  const data = forms.map((item) => Object.values(item));
  // console.log(forms)
  // const headers = (forms[0] !== null | forms[0] !== undefined)  ? Object.keys(forms[0]) : null;
  // console.log(header);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getVehicleInspectionFormUrl);
        let d = response.data
        d = d.reverse()
        setForms(d);
        setHeaders(Object.keys(d[0]))

        setTotalForms(response.data.length);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const handleSubmit = (formData) => {
    handleClose();
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
          <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Vehicle Inspection Submissions</h5>
          <Button variant='light'>
            <ExportCSV data={[headers, ...data]} filename="table-data.csv">
              Export to CSV
            </ExportCSV>
          </Button>

        </div>
        <Table hover className="user-table align-items-center">
          <thead>
          <tr>
            <th className="border-bottom">#</th>
            {/* <th className="border-bottom">User ID</th> */}
            <th className="border-bottom">Date Time</th>
            {/* <th className="border-bottom">First Name</th> */}
            <th className="border-bottom">Vehicle Name</th>
            <th className="border-bottom">Vehicle No</th>
            <th className="border-bottom">Pickup Jobsite</th>
            <th className="border-bottom">Dropoff Location</th>
            <th className="border-bottom">Inspected By</th>
            <th className="border-bottom">Physical Damage</th>
            <th className="border-bottom">Leak Status</th>
            <th className="border-bottom">LHA Condition</th>
            <th className="border-bottom">Safety Devices Condition</th>
            <th className="border-bottom">Up Low Emergency Controls</th>
            <th className="border-bottom">Oil Capacity</th>
            <th className="border-bottom">Safety Warning Decals Condition</th>
            <th className="border-bottom">Park Brake Condition</th>
            <th className="border-bottom">Image Object</th>
            <th className="border-bottom">Notes</th>
            {/* <th className="border-bottom">Last Name</th> */}
          </tr>
          </thead>


          <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose} size='xl'>
            <Modal.Header>
              <Modal.Title className="h6">Attachments</Modal.Title>
              <Button variant="close" aria-label="Close" onClick={handleClose}/>
            </Modal.Header>
            <Modal.Body>
              <S3FileList folderUrl={folderUrl}/>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleClose}>
                    I Got It
                </Button> */}
              <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <tbody>
          {forms.map((form, index) => (
              <tr key={index}>
                <td>{form.formID}</td>
                {/* <td>{form.userID}</td> */}
                <td>{formatDateTime(form.dateTime)}</td>
                {/* <td>{form.firstName}</td> */}
                <td>{form.vehicleName}</td>
                <td>{form.vehicleNo}</td>
                <td>{form.pickupJobsite}</td>
                <td>{form.dropoffLocation}</td>
                <td>{form.inspectedBy}</td>
                <td>{form.physicalDamage}</td>
                <td>{form.leakStatus}</td>
                <td>{form.lhaCondition}</td>
                <td>{form.safetyDevicesCondition}</td>
                <td>{form.up_lowEmergencyControls}</td>
                <td>{form.oilCapacity}</td>
                <td>{form.safetyWarningDecalsCondition}</td>
                <td>{form.parkBrakeCondition}</td>
                {/* <td>{form.folderUrl}</td> */}
                {/* <td>
                  {Array.isArray(form.folderUrl) && form.folderUrl.length > 1 ? (
                    <Button variant="light" className="my-3" onClick={() => setShowDefault(true)}>Open</Button>
                  ) : (
                    form.folderUrl
                  )}
                </td> */}
                <td><Button variant="light" className="my-3" onClick={() => {
                  setFolderUrl(form.folderUrl)
                  setShowDefault(true)

                }}>Open</Button></td>
                <td>{form.notes}</td>
                {/* <td>{form.lastName}</td> */}
              </tr>
          ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalForms}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const VMFTable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [headers, setHeaders] = useState([]);
  const data = forms.map((item) => Object.values(item));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getVehicleMovingFormUrl);
        let d = response.data
        d = d.reverse()
        setForms(d);
        setHeaders(Object.keys(d[0]))
        // setForms(response.data);
        // console.log(response.data)
        setTotalForms(response.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
          <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Vehicle Moving Form Submissions</h5>
          <Button variant='light'>
            <ExportCSV data={[headers, ...data]} filename="table-data.csv">
              Export to CSV
            </ExportCSV>
          </Button>

        </div>

        <Table hover className="user-table align-items-center">
          <thead>
          <tr>
            <th className="border-bottom">#</th>
            <th className="border-bottom">User ID</th>
            <th className="border-bottom">Date Time</th>
            <th className="border-bottom">First Name</th>
            <th className="border-bottom">Last Name</th>
            <th className="border-bottom">Vehicle Name</th>
            <th className="border-bottom">Vehicle No</th>
            <th className="border-bottom">Pickup Jobsite</th>
            <th className="border-bottom">Dropoff Location</th>
            <th className="border-bottom">Notes</th>

          </tr>
          </thead>
          <tbody>
          {forms.map((form, index) => (
              <tr key={index}>
                <td>{form.formID}</td>
                <td>{form.userID}</td>
                <td>{formatDateTime(form.dateTime)}</td>
                <td>{form.firstName}</td>
                <td>{form.lastName}</td>
                <td>{form.vehicleName}</td>
                <td>{form.vehicleNo}</td>
                <td>{form.pickupJobsite}</td>
                <td>{form.dropoffLocation}</td>
                <td>{form.notes}</td>

              </tr>
          ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalForms}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const DRTable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [headers, setHeaders] = useState([]);
  const data = forms.map((item) => Object.values(item));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getDailyReports);
        // setForms(response.data);
        let d = response.data
        d = d.reverse()
        setForms(d);
        setHeaders(Object.keys(d[0]))
        setTotalForms(response.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  
  // Coordinates of Springfield, MO
  // const latitude = '37.2090° N';
  // const longitude = '93.2923° W';
  // const API_KEY = '7036f0b118db1fe7096dddf444b4a0bb';
  // const getWeatherDetails = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
  //     console.log(response.data.weather);
  //     return response.data.weather[0].description;
      
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     return 'Weather data not available';
  //   }
  // };
  
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
          <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Daily Reports</h5>
          <Button variant='light'>
            <ExportCSV data={[headers, ...data]} filename="table-data.csv">
              Export to CSV
            </ExportCSV>
          </Button>

        </div>
        <Table hover className="user-table align-items-center">
          <thead>
          <tr>
            {/*<th className="border-bottom">#</th>*/}
            {/*<th className="border-bottom">User ID</th>*/}
            <th className="border-bottom">Date Time</th>
            <th className="border-bottom">First Name</th>
            <th className="border-bottom">Last Name</th>
            <th className="border-bottom">Project Name</th>
            <th className="border-bottom">Project Location</th>
            <th className="border-bottom">Scope of Work</th>
            <th className="border-bottom">Work Performed</th>
            <th className="border-bottom">Weather Details</th>
            <th className="border-bottom">Notes</th>
          </tr>
          </thead>
          <tbody>
          {forms.map((form, index) => (
              <tr key={index}>
                {/*<td>{index}</td>*/}
                {/*<td>{form.userID}</td>*/}
                <td>{formatDateTime(form.dateTime)}</td>
                <td>{form.firstName}</td>
                <td>{form.lastName}</td>
                <td>{form.projectName}</td>
                <td>{form.projectLocation}</td>
                <td>{form.scopeOfWork}</td>
                <td>{form.workPerformed}</td>
                <td>{form.weatherDetails}</td>
                {/* <td>{getWeatherDetails('37.2090° N', '93.2923° W')}</td> */}
                <td>{form.notes}</td>
              </tr>
          ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalForms}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const {name, usage = [], description, link} = props;

    return (
        <tr>
          <td className="border-0" style={{width: '5%'}}>
            <code>{name}</code>
          </td>
          <td className="fw-bold border-0" style={{width: '5%'}}>
            <ul className="ps-0">
              {usage.map(u => (
                  <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProjects);
        setProjects(response.data);
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goToProjectDetails = (project) => {
    history.push({pathname:'/projectdetails',state:{ project:project }});
  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <h5 style={{ padding: '10px', marginTop: '10px' }}>Projects</h5>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Project Name</th>
              <th className="border-bottom">Project Status</th>
              <th className="border-bottom">Action</th>
              
              
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.projectID}</td>
                <td>{project.projectName}</td>
                <td>{project.projectStatus}</td>
                <td><Button variant="link" className="text-gray ms-auto" onClick={()=>goToProjectDetails(project)}><FontAwesomeIcon icon={faEye} /></Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{projects.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const ContractsTable = () => {
  const [contracts, setContracts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getContracts);
        setContracts(response.data);
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <h5 style={{ padding: '10px', marginTop: '10px' }}>Contracts</h5>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Contract Name</th>
              <th className="border-bottom">File</th>
              
              
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index}>
                <td>{contract.contractID}</td>
                <td>{contract.contractName}</td>
                <td>{contract.fileUrl}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{contracts.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const DrawingsTable = () => {
  const [drawings, setDrawings] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getDrawings);
        setDrawings(response.data);
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <h5 style={{ padding: '10px', marginTop: '10px' }}>Contracts</h5>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Drawing Name</th>
              <th className="border-bottom">File</th>
              
              
            </tr>
          </thead>
          <tbody>
            {drawings.map((drawing, index) => (
              <tr key={index}>
                <td>{drawing.drawingID}</td>
                <td>{drawing.drawingName}</td>
                <td>{drawing.fileUrl}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{drawings.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};