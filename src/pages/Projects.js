import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Modal, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TransactionsTable, CommandsTable, ProjectsTable } from "../components/Tables";
import { Project_Form } from "../components/Forms";



export default () => {

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const handleSubmit = (formData) => {
    handleClose();
  };

  return (
    <>
    
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>CDI</Breadcrumb.Item>
            <Breadcrumb.Item active>Projects</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Projects</h4>
          {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
        </div>
        
      </div>

      <div>
      
        <Button variant="secondary" className="my-3" onClick={() => setShowDefault(true)}><FontAwesomeIcon icon={faPlus} className="me-2" />New</Button>

        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="h6">Create a New Project</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <Project_Form onSubmit={handleSubmit}/>
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
      
      </div>
      <ProjectsTable/>

      {/* <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div> */}

      
    </>
  );
};
