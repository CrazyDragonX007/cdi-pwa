
import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faTrashAlt, faEye, faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons';
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
const getMiscFiles = `${apiURL}/crud/getMiscellaneousFiles`
const getIncidentReportForm = `${apiURL}/crud/getIncidentReportForm`
const getTruckInspection = `${apiURL}/crud/getTruckInspectionForm`

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
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const [showDefault, setShowDefault] = useState(false);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const data = forms.map((item) => Object.values(item));

  // Sorting function
  const sortedForms = useMemo(() => {
    let sortableItems = [...forms];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Special handling for date columns
        if (sortConfig.key === 'dateTime') {
          return sortConfig.direction === 'ascending'
              ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
              : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }

        // Handle numeric columns
        if (sortConfig.key === 'formID') {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key] - b[sortConfig.key]
              : b[sortConfig.key] - a[sortConfig.key];
        }

        // Handle string comparisons
        if (typeof a[sortConfig.key] === 'string') {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key].localeCompare(b[sortConfig.key])
              : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }

        // Default comparison for other types
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [forms, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting header component
  const SortableHeader =  ({ column, children }) => (

      <th
          className="border-bottom sortable"
          onClick={() => requestSort(column)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {children}
        {sortConfig.key === column && (
            <span style={{ marginLeft: '5px' }}>
          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
        </span>
        )}
      </th>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getVehicleInspectionFormUrl);
        let d = response.data.reverse();
        setForms(d);
        setHeaders(Object.keys(d[0]));
        setTotalForms(d.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  const handleClose = () => setShowDefault(false);

  // Get current forms based on sorted data
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Equipment Inspection Submissions</h5>
            <Button variant='light'>
              <ExportCSV data={[headers, ...data]} filename="vehicle-inspection-forms.csv">
                Export to CSV
              </ExportCSV>
            </Button>
          </div>
          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <SortableHeader column="formID">#</SortableHeader>
              <SortableHeader column="dateTime">Date Time</SortableHeader>
              <SortableHeader column="vehicleName">Vehicle Name</SortableHeader>
              <SortableHeader column="vehicleNo">Vehicle No</SortableHeader>
              <SortableHeader column="projectName">Project Name</SortableHeader>

              <SortableHeader column="inspectedBy">Inspected By</SortableHeader>
              <SortableHeader column="physicalDamage">Physical Damage</SortableHeader>
              <SortableHeader column="leakStatus">Leak Status</SortableHeader>
              <SortableHeader column="lhaCondition">LHA Condition</SortableHeader>
              <SortableHeader column="safetyDevicesCondition">Safety Devices Condition</SortableHeader>
              <SortableHeader column="up_lowEmergencyControls">Up Low Emergency Controls</SortableHeader>
              <SortableHeader column="oilCapacity">Oil Capacity</SortableHeader>
              <SortableHeader column="safetyWarningDecalsCondition">Safety Warning Decals Condition</SortableHeader>
              <SortableHeader column="parkBrakeCondition">Park Brake Condition</SortableHeader>
              <th className="border-bottom">Image Object</th>
              <SortableHeader column="notes">Notes</SortableHeader>
            </tr>
            </thead>
            <tbody>
            {currentForms.map((form, index) => (
                <tr key={index}>
                  <td>{form.formID}</td>
                  <td>{formatDateTime(form.dateTime)}</td>
                  <td>{form.vehicleName}</td>
                  <td>{form.vehicleNo}</td>
                  <td>{form.projectName}</td>

                  <td>{form.inspectedBy}</td>
                  <td>{form.physicalDamage}</td>
                  <td>{form.leakStatus}</td>
                  <td>{form.lhaCondition}</td>
                  <td>{form.safetyDevicesCondition}</td>
                  <td>{form.up_lowEmergencyControls}</td>
                  <td>{form.oilCapacity}</td>
                  <td>{form.safetyWarningDecalsCondition}</td>
                  <td>{form.parkBrakeCondition}</td>
                  <td>
                    <Button variant="light" style = {{
                      lineHeight: '0.5', padding: '10px'
                    }} onClick={() => {
                      setFolderUrl(form.folderUrl);
                      setShowDefault(true);
                    }}>
                      Open
                    </Button>
                  </td>
                  <td>{form.notes}</td>
                </tr>
            ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstForm + 1}</b> to <b>{Math.min(indexOfLastForm, totalForms)}</b> out of <b>{totalForms}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>

        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose} size='xl'>
          <Modal.Header>
            <Modal.Title className="h6">Attachments</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose}/>
          </Modal.Header>
          <Modal.Body>
            <S3FileList folderUrl={folderUrl}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
  );
};

export const VMFTable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const data = forms.map((item) => Object.values(item));

  // Sorting function
  const sortedForms = useMemo(() => {
    let sortableItems = [...forms];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Special handling for date columns
        if (sortConfig.key === 'dateTime') {
          return sortConfig.direction === 'ascending'
              ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
              : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }

        // Handle numeric columns
        if (['formID', 'userID'].includes(sortConfig.key)) {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key] - b[sortConfig.key]
              : b[sortConfig.key] - a[sortConfig.key];
        }

        // Handle string comparisons
        if (typeof a[sortConfig.key] === 'string') {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key].localeCompare(b[sortConfig.key])
              : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }

        // Default comparison for other types
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [forms, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting header component
  const SortableHeader = ({ column, children }) => (
      <th
          className="border-bottom sortable"
          onClick={() => requestSort(column)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {children}
        {sortConfig.key === column && (
            <span style={{ marginLeft: '5px' }}>
          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
        </span>
        )}
      </th>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getVehicleMovingFormUrl);
        let d = response.data.reverse();
        setForms(d);
        setHeaders(Object.keys(d[0]));
        setTotalForms(d.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  // Get current forms based on sorted data
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Equipment Moving Form Submissions</h5>
            <Button variant='light'>
              <ExportCSV data={[headers, ...data]} filename="vehicle-moving-forms.csv">
                Export to CSV
              </ExportCSV>
            </Button>
          </div>

          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <SortableHeader column="formID">#</SortableHeader>
              <SortableHeader column="userID">User ID</SortableHeader>
              <SortableHeader column="dateTime">Date Time</SortableHeader>
              <SortableHeader column="firstName">First Name</SortableHeader>
              <SortableHeader column="lastName">Last Name</SortableHeader>
              {/*<SortableHeader column="projectName">Project Name</SortableHeader>*/}
              <SortableHeader column="vehicleName">Vehicle Name</SortableHeader>
              <SortableHeader column="vehicleNo">Vehicle No</SortableHeader>
              <SortableHeader column="pickupJobsite">Pickup Jobsite</SortableHeader>
              <SortableHeader column="dropoffLocation">Dropoff Location</SortableHeader>
              <SortableHeader column="notes">Notes</SortableHeader>
            </tr>
            </thead>
            <tbody>
            {currentForms.map((form, index) => (
                <tr key={index}>
                  <td>{form.formID}</td>
                  <td>{form.userID}</td>
                  <td>{formatDateTime(form.dateTime)}</td>
                  <td>{form.firstName}</td>
                  <td>{form.lastName}</td>
                  {/*<td>{form.projectName}</td>*/}
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
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstForm + 1}</b> to <b>{Math.min(indexOfLastForm, totalForms)}</b> out of <b>{totalForms}</b> entries
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
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const data = forms.map((item) => Object.values(item));

  // Sorting function
  const sortedForms = useMemo(() => {
    let sortableItems = [...forms];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Special handling for date columns
        if (sortConfig.key === 'dateTime') {
          return sortConfig.direction === 'ascending'
              ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
              : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }

        // Handle string comparisons
        if (typeof a[sortConfig.key] === 'string') {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key].localeCompare(b[sortConfig.key])
              : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }

        // Default comparison for other types
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [forms, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting header component
  const SortableHeader = ({ column, children }) => (
      <th
          className="border-bottom sortable"
          onClick={() => requestSort(column)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {children}
        {sortConfig.key === column && (
            <span style={{ marginLeft: '5px' }}>
          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
        </span>
        )}
      </th>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getDailyReports);
        let d = response.data.reverse();
        setForms(d);
        setHeaders(Object.keys(d[0]));
        setTotalForms(d.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  // Get current forms based on sorted data
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Daily Reports</h5>
            <Button variant='light'>
              <ExportCSV data={[headers, ...data]} filename="daily-reports.csv">
                Export to CSV
              </ExportCSV>
            </Button>
          </div>
          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <SortableHeader column="dateTime">Date Time</SortableHeader>
              <SortableHeader column="firstName">First Name</SortableHeader>
              <SortableHeader column="lastName">Last Name</SortableHeader>
              <SortableHeader column="projectName">Project Name</SortableHeader>
              <SortableHeader column="projectLocation">Project Location</SortableHeader>
              <SortableHeader column="scopeOfWork">Scope of Work</SortableHeader>
              <SortableHeader column="workPerformed">Work Performed</SortableHeader>
              <SortableHeader column="weatherDetails">Weather Details</SortableHeader>
              <SortableHeader column="notes">Notes</SortableHeader>
            </tr>
            </thead>
            <tbody>
            {currentForms.map((form, index) => (
                <tr key={index}>
                  <td>{formatDateTime(form.dateTime)}</td>
                  <td>{form.firstName}</td>
                  <td>{form.lastName}</td>
                  <td>{form.projectName}</td>
                  <td>{form.projectLocation}</td>
                  <td>{form.scopeOfWork}</td>
                  <td>{form.workPerformed}</td>
                  <td>{form.weatherDetails}</td>
                  <td>{form.notes}</td>
                </tr>
            ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstForm + 1}</b> to <b>{Math.min(indexOfLastForm, totalForms)}</b> out of <b>{totalForms}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
  );
};

export const IRTable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  // Sorting function
  const sortedForms = useMemo(() => {
    let sortableItems = [...forms];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Special handling for date columns
        if (['dateTime', 'employeeSignDate', 'supervisorSignDate'].includes(sortConfig.key)) {
          return sortConfig.direction === 'ascending'
              ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
              : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }

        // Handle string comparisons
        if (typeof a[sortConfig.key] === 'string') {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key].localeCompare(b[sortConfig.key])
              : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }

        // Default comparison for other types
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [forms, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting header component
  const SortableHeader = ({ column, children }) => (
      <th
          className="border-bottom sortable"
          onClick={() => requestSort(column)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {children}
        {sortConfig.key === column && (
            <span style={{ marginLeft: '5px' }}>
          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
        </span>
        )}
      </th>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getIncidentReportForm);
        let d = response.data.reverse();
        setForms(d);
        setHeaders(Object.keys(d[0]));
        setTotalForms(d.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  // Get current forms based on sorted data
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Incident Reports</h5>
            <Button variant='light'>
              <ExportCSV
                  data={[
                    headers,
                    ...forms.map(form => [
                      formatDateTime(form.dateTime),
                      form.name,
                      form.peopleInvolved,
                      form.incidentType,
                      form.location,
                      form.vehicle,
                      form.vehicleNo,
                      form.pickupLocation,
                      form.dropoffLocation,
                      form.unsafeAct,
                      form.description,
                      form.employeeSign,
                      form.employeeSignDate,
                      form.supervisorSign,
                      form.supervisorSignDate
                    ])
                  ]}
                  filename="incident-reports.csv"
              >
                Export to CSV
              </ExportCSV>
            </Button>
          </div>
          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <SortableHeader column="dateTime">Date Time</SortableHeader>
              <SortableHeader column="name">Name</SortableHeader>
              <SortableHeader column="peopleInvolved">People Involved</SortableHeader>
              <SortableHeader column="incidentType">Incident Type</SortableHeader>
              <SortableHeader column="location">Location</SortableHeader>
              {/*<SortableHeader column="vehicle">Vehicle</SortableHeader>*/}
              {/*<SortableHeader column="vehicleNo">Vehicle No.</SortableHeader>*/}
              {/*<SortableHeader column="pickupLocation">Pickup Location</SortableHeader>*/}
              {/*<SortableHeader column="dropoffLocation">Dropoff Location</SortableHeader>*/}
              <SortableHeader column="unsafeAct">Unsafe Act</SortableHeader>
              <SortableHeader column="description">Description</SortableHeader>
              <SortableHeader column="employeeSign">Employee Signature</SortableHeader>
              <SortableHeader column="employeeSignDate">Employee Sign Date</SortableHeader>
              {/*<SortableHeader column="supervisorSign">Supervisor Signature</SortableHeader>*/}
              {/*<SortableHeader column="supervisorSignDate">Supervisor Sign Date</SortableHeader>*/}
            </tr>
            </thead>
            <tbody>
            {currentForms.map((form, index) => (
                <tr key={index}>
                  <td>{formatDateTime(form.dateTime)}</td>
                  <td>{form.name}</td>
                  <td>{form.peopleInvolved}</td>
                  <td>{form.incidentType}</td>
                  <td>{form.location}</td>
                  {/*<td>{form.vehicle}</td>*/}
                  {/*<td>{form.vehicleNo}</td>*/}
                  {/*<td>{form.pickupLocation}</td>*/}
                  {/*<td>{form.dropoffLocation}</td>*/}
                  <td>{form.unsafeAct}</td>
                  <td>{form.description}</td>
                  <td>{form.employeeSign}</td>
                  <td>{form.employeeSignDate}</td>
                  {/*<td>{form.supervisorSign}</td>*/}
                  {/*<td>{form.supervisorSignDate}</td>*/}
                </tr>
            ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstForm + 1}</b> to <b>{Math.min(indexOfLastForm, totalForms)}</b> out of <b>{totalForms}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
  );
};

export const TITable = () => {
  const [forms, setForms] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const data = forms.map((item) => Object.values(item));

  // Sorting function
  const sortedForms = useMemo(() => {
    let sortableItems = [...forms];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Special handling for date
        if (sortConfig.key === 'dateTime') {
          return sortConfig.direction === 'ascending'
              ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
              : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }

        // Handle numeric columns
        if (['mileage', 'inspectionID'].includes(sortConfig.key)) {
          return sortConfig.direction === 'ascending'
              ? a[sortConfig.key] - b[sortConfig.key]
              : b[sortConfig.key] - a[sortConfig.key];
        }

        // Default string comparison
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [forms, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting header component
  const SortableHeader = ({ column, children }) => (
      <th
          className="border-bottom sortable"
          onClick={() => requestSort(column)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {children}
        {sortConfig.key === column && (
            <span style={{ marginLeft: '5px' }}>
          {sortConfig.direction === 'ascending' ? '▲' : '▼'}
        </span>
        )}
      </th>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getTruckInspection);
        let d = response.data.reverse();
        setForms(d);
        setHeaders(Object.keys(d[0]));
        setTotalForms(d.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MM/DD/YYYY hh:mm A');
  };

  // Get current forms based on sorted data
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <h5 style={{margin: '0', padding: '10px', flexGrow: '1'}}>Truck Inspection Submissions</h5>
            <Button variant='light'>
              <ExportCSV data={[headers, ...data]} filename="truck-inspection-data.csv">
                Export to CSV
              </ExportCSV>
            </Button>
          </div>
          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <SortableHeader column="inspectionID">Inspection ID</SortableHeader>
              <SortableHeader column="truckNo">Truck No</SortableHeader>
              <SortableHeader column="mileage">Mileage</SortableHeader>
              <SortableHeader column="dateTime">Date Time</SortableHeader>
              <th className="border-bottom">Engine Oil</th>
              <th className="border-bottom">Anti-Freeze</th>
              <th className="border-bottom">Power Steering</th>
              <th className="border-bottom">Transmission</th>
              <th className="border-bottom">Washer</th>
              <th className="border-bottom">GPS Holder</th>
              <th className="border-bottom">Insurance/Reg</th>
              <th className="border-bottom">Backup Alarm</th>
              <th className="border-bottom">Fire Ext</th>
              <th className="border-bottom">Horn</th>
              <th className="border-bottom">All Glass</th>
              <th className="border-bottom">Mirrors</th>
              <th className="border-bottom">Tire PSI</th>
              <th className="border-bottom">Head Lights</th>
              <th className="border-bottom">Park Lights</th>
              <th className="border-bottom">Flasher</th>
              <th className="border-bottom">Strobe Lights</th>
              <th className="border-bottom">Work Lights</th>
              <th className="border-bottom">Four Straps</th>
              <th className="border-bottom">Tommy Gate</th>
              <th className="border-bottom">Trailer Towed</th>
              <th className="border-bottom">Drain Air Tanks</th>
              <th className="border-bottom">Dashboard Clear</th>
              <th className="border-bottom">Policy Ack</th>
              <th className="border-bottom">Sign Name</th>
              <th className="border-bottom">Notes</th>
            </tr>
            </thead>
            <tbody>
            {currentForms.map((form, index) => (
                <tr key={index}>
                  <td>{form.inspectionID}</td>
                  <td>{form.truckNo}</td>
                  <td>{form.mileage}</td>
                  <td>{formatDateTime(form.dateTime)}</td>
                  <td>{form.engineOil}</td>
                  <td>{form.antiFreeze}</td>
                  <td>{form.powerSteering}</td>
                  <td>{form.transmission}</td>
                  <td>{form.washer}</td>
                  <td>{form.gpsHolder}</td>
                  <td>{form.insuranceReg}</td>
                  <td>{form.backupAlarm}</td>
                  <td>{form.fireExt}</td>
                  <td>{form.horn}</td>
                  <td>{form.allGlass}</td>
                  <td>{form.mirrors}</td>
                  <td>{form.tirePSI}</td>
                  <td>{form.headLights}</td>
                  <td>{form.parkLights}</td>
                  <td>{form.flasher}</td>
                  <td>{form.strobeLights}</td>
                  <td>{form.workLights}</td>
                  <td>{form.fourStraps}</td>
                  <td>{form.tommyGate}</td>
                  <td>{form.trailerTowed}</td>
                  <td>{form.drainAirtanks}</td>
                  <td>{form.dashboardClear}</td>
                  <td>{form.policyAck}</td>
                  <td>{form.signName}</td>
                  <td>{form.notes}</td>
                </tr>
            ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstForm + 1}</b> to <b>{Math.min(indexOfLastForm, totalForms)}</b> out of <b>{totalForms}</b> entries
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
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProjects);
        let d = response.data.reverse();
        setProjects(d);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goToProjectDetails = (project) => {
    history.push({pathname:'/projectdetails', state:{ project:project }});
  }

  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
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
            {currentProjects.map((project, index) => (
                <tr
                    key={index}
                    onClick={() => goToProjectDetails(project)}
                    style={{cursor: 'pointer'}}
                    className="hover-row" // Add this class
                >
                  <td>{project.projectID}</td>
                  <td>{project.projectName}</td>
                  <td>{project.projectStatus}</td>
                  <td>
                    <Button
                        variant="link"
                        className="text-gray ms-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToProjectDetails(project);
                        }}
                    >
                      <FontAwesomeIcon icon={faEye}/>
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {pageNumbers.map(number => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                    >
                      {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(projects.length / projectsPerPage)}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{indexOfFirstProject + 1}</b> to <b>{Math.min(indexOfLastProject, projects.length)}</b> out of <b>{projects.length}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
  );
};

export const ContractsTable = (props) => {
  const [contracts, setContracts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewType, setPreviewType] = useState('pdf'); // 'pdf', 'image', or 'excel'
  const projectId = props.projectID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getContracts, {
          params: {
            projectID: projectId
          }
        });

        setContracts(response.data);
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilePreview = (contract) => {
    setSelectedFile(contract);
    setPreviewType('pdf'); // Start with PDF
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewType('pdf');
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const fileName = selectedFile.contractName;
    const fileUrl = selectedFile.fileUrl;

    if (previewType === 'pdf') {
      return (
        <div style={{ position: 'relative', height: '70vh' }}>
          <iframe
            src={fileUrl}
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              borderRadius: '8px'
            }}
            title={fileName}
            onError={() => setPreviewType('image')}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('image')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </Button>
          </div>
        </div>
      );
    }

    if (previewType === 'image') {
      return (
        <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
          <img 
            src={fileUrl} 
            alt={fileName}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              cursor: 'zoom-in',
              transition: 'transform 0.3s ease'
            }}
            onError={() => setPreviewType('excel')}
            onClick={(e) => {
              if (e.target.style.transform === 'scale(1.5)') {
                e.target.style.transform = 'scale(1)';
                e.target.style.cursor = 'zoom-in';
              } else {
                e.target.style.transform = 'scale(1.5)';
                e.target.style.cursor = 'zoom-out';
              }
            }}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('pdf')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} />
            </Button>
          </div>
        </div>
      );
    }

    // Excel/Document fallback
    return (
      <div 
        className="text-center p-4"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <h5>Excel/Document File</h5>
        <p>This file cannot be previewed directly in the browser.</p>
        <p>Click "Open in New Tab" below to download and view the file.</p>
      </div>
    );
  };

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
                <td>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleFilePreview(contract)}
                    style={{ lineHeight: '0.5', padding: '10px' }}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Preview
                  </Button>
                </td>
               
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

      <Modal 
        as={Modal.Dialog} 
        centered 
        show={showModal} 
        onHide={handleClose} 
        size='xl'
        style={{ 
          maxWidth: '95vw',
          margin: '10px auto'
        }}
      >
        <Modal.Header>
          <Modal.Title className="h6">
            {selectedFile ? selectedFile.contractName : 'File Preview'}
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body 
          className="text-center"
          style={{ 
            padding: window.innerWidth <= 768 ? '10px' : '20px',
            overflow: 'auto'
          }}
        >
          {renderFilePreview()}
        </Modal.Body>
        <Modal.Footer 
          style={{ 
            padding: window.innerWidth <= 768 ? '10px' : '15px',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: window.innerWidth <= 768 ? '10px' : '0'
          }}
        >
          {selectedFile && (
            <Button 
              variant="primary" 
              href={selectedFile.fileUrl} 
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                width: window.innerWidth <= 768 ? '100%' : 'auto',
                fontSize: window.innerWidth <= 768 ? '14px' : '16px'
              }}
            >
              Open in New Tab
            </Button>
          )}
          <Button 
            variant="link" 
            className="text-gray ms-auto" 
            onClick={handleClose}
            style={{ 
              width: window.innerWidth <= 768 ? '100%' : 'auto',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px'
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export const DrawingsTable = (props) => {
  const [drawings, setDrawings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewType, setPreviewType] = useState('pdf'); // 'pdf', 'image', or 'excel'
  const projectId = props.projectID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getDrawings, {
          params: {
            projectID: projectId
          }
        });
        setDrawings(response.data);
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilePreview = (drawing) => {
    setSelectedFile(drawing);
    setPreviewType('pdf'); // Start with PDF
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewType('pdf');
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const fileName = selectedFile.drawingName;
    const fileUrl = selectedFile.fileUrl;

    if (previewType === 'pdf') {
      return (
        <div style={{ position: 'relative', height: '70vh' }}>
          <iframe
            src={fileUrl}
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              borderRadius: '8px'
            }}
            title={fileName}
            onError={() => setPreviewType('image')}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('image')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </Button>
          </div>
        </div>
      );
    }

    if (previewType === 'image') {
      return (
        <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
          <img 
            src={fileUrl} 
            alt={fileName}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              cursor: 'zoom-in',
              transition: 'transform 0.3s ease'
            }}
            onError={() => setPreviewType('excel')}
            onClick={(e) => {
              if (e.target.style.transform === 'scale(1.5)') {
                e.target.style.transform = 'scale(1)';
                e.target.style.cursor = 'zoom-in';
              } else {
                e.target.style.transform = 'scale(1.5)';
                e.target.style.cursor = 'zoom-out';
              }
            }}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('pdf')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} />
            </Button>
          </div>
        </div>
      );
    }

    // Excel/Document fallback
    return (
      <div 
        className="text-center p-4"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <h5>Excel/Document File</h5>
        <p>This file cannot be previewed directly in the browser.</p>
        <p>Click "Open in New Tab" below to download and view the file.</p>
      </div>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <h5 style={{ padding: '10px', marginTop: '10px' }}>Drawings</h5>
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
                <td>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleFilePreview(drawing)}
                    style={{ lineHeight: '0.5', padding: '10px' }}
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Preview
                  </Button>
                </td>

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

      <Modal 
        as={Modal.Dialog} 
        centered 
        show={showModal} 
        onHide={handleClose} 
        size='xl'
        style={{ 
          maxWidth: '95vw',
          margin: '10px auto'
        }}
      >
        <Modal.Header>
          <Modal.Title className="h6">
            {selectedFile ? selectedFile.drawingName : 'File Preview'}
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body 
          className="text-center"
          style={{ 
            padding: window.innerWidth <= 768 ? '10px' : '20px',
            overflow: 'auto'
          }}
        >
          {renderFilePreview()}
        </Modal.Body>
        <Modal.Footer 
          style={{ 
            padding: window.innerWidth <= 768 ? '10px' : '15px',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: window.innerWidth <= 768 ? '10px' : '0'
          }}
        >
          {selectedFile && (
            <Button 
              variant="primary" 
              href={selectedFile.fileUrl} 
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                width: window.innerWidth <= 768 ? '100%' : 'auto',
                fontSize: window.innerWidth <= 768 ? '14px' : '16px'
              }}
            >
              Open in New Tab
            </Button>
          )}
          <Button 
            variant="link" 
            className="text-gray ms-auto" 
            onClick={handleClose}
            style={{ 
              width: window.innerWidth <= 768 ? '100%' : 'auto',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px'
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export const FilesTable = (props) => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewType, setPreviewType] = useState('pdf'); // 'pdf', 'image', or 'excel'
  const projectId = props.projectID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getMiscFiles, {
          params: {
            projectID: projectId
          }
        });
        setFiles(response.data);
        console.log(response.data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilePreview = (drawing) => {
    setSelectedFile(drawing);
    setPreviewType('pdf'); // Start with PDF
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewType('pdf');
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const fileName = selectedFile.miscFileName;
    const fileUrl = selectedFile.fileUrl;

    if (previewType === 'pdf') {
      return (
        <div style={{ position: 'relative', height: '70vh' }}>
          <iframe
            src={fileUrl}
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              borderRadius: '8px'
            }}
            title={fileName}
            onError={() => setPreviewType('image')}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('image')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </Button>
          </div>
        </div>
      );
    }

    if (previewType === 'image') {
      return (
        <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
          <img 
            src={fileUrl} 
            alt={fileName}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              cursor: 'zoom-in',
              transition: 'transform 0.3s ease'
            }}
            onError={() => setPreviewType('excel')}
            onClick={(e) => {
              if (e.target.style.transform === 'scale(1.5)') {
                e.target.style.transform = 'scale(1)';
                e.target.style.cursor = 'zoom-in';
              } else {
                e.target.style.transform = 'scale(1.5)';
                e.target.style.cursor = 'zoom-out';
              }
            }}
          />
          {/* Mobile Controls Overlay */}
          <div 
            className="d-block d-md-none"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setPreviewType('pdf')}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} />
            </Button>
          </div>
        </div>
      );
    }

    // Excel/Document fallback
    return (
      <div 
        className="text-center p-4"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <h5>Excel/Document File</h5>
        <p>This file cannot be previewed directly in the browser.</p>
        <p>Click "Open in New Tab" below to download and view the file.</p>
      </div>
    );
  };

  return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <h5 style={{ padding: '10px', marginTop: '10px' }}>Files</h5>
          <Table hover className="user-table align-items-center">
            <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Drawing Name</th>
              <th className="border-bottom">File</th>


            </tr>
            </thead>
            <tbody>
            {files.map((file, index) => (
                <tr key={index}>
                  <td>{file.miscFileID}</td>
                  <td>{file.miscFileName}</td>
                  <td>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => handleFilePreview(file)}
                      style={{ lineHeight: '0.5', padding: '10px' }}
                    >
                      <FontAwesomeIcon icon={faEye} className="me-2" />
                      Preview
                    </Button>
                  </td>

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
              Showing <b>{files.length}</b> out of <b>25</b> entries
            </small>
          </Card.Footer>
        </Card.Body>

        <Modal 
          as={Modal.Dialog} 
          centered 
          show={showModal} 
          onHide={handleClose} 
          size='xl'
          style={{ 
            maxWidth: '95vw',
            margin: '10px auto'
          }}
        >
          <Modal.Header>
            <Modal.Title className="h6">
              {selectedFile ? selectedFile.miscFileName : 'File Preview'}
            </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose}/>
          </Modal.Header>
          <Modal.Body className="text-center">
            {renderFilePreview()}
          </Modal.Body>
          <Modal.Footer>
            {selectedFile && (
              
                <Button 
                  variant="primary" 
                  href={selectedFile.fileUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in New Tab
                </Button>
                
              
            )}
            <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
  );
};