import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPalette, faLaptopCode, faUser, faBookReader, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { Nav, Tab, Card, Modal } from '@themesberg/react-bootstrap';
import { TransactionsTable, ContractsTable, DrawingsTable } from "../components/Tables";
import Documentation from "../components/Documentation";
import { faDochub } from "@fortawesome/free-brands-svg-icons";
import { Contract_Drawing_Form } from "../components/Forms";


export default (props) => {
  console.log(props);
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>CDI</Breadcrumb.Item>
            <Breadcrumb.Item active>Project Details</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Project Details: Project Name</h4>
          {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
          <Button variant="secondary" className="my-3" onClick={() => setShowDefault(true)}><FontAwesomeIcon icon={faPlus} className="me-2" />New</Button>
          </ButtonGroup>
        </div>
        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="h6">Upload Contract/Drawing</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <Contract_Drawing_Form />
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
      <div>
        
      </div>
      <Card border="light" className="mb-4 bg-white shadow-sm">
        <Card.Body>
        <Tab.Container defaultActiveKey="visual_design">
        <Row>
          <Col lg={12}>
            <Nav fill variant="pills" className="flex-column flex-sm-row">
              
              <Nav.Item>
                <Nav.Link eventKey="code_friendly" className="mb-sm-3 mb-md-0">
                  <FontAwesomeIcon icon={faBookReader} className="me-2" /> Contracts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="user_experience" className="mb-sm-3 mb-md-0">
                  <FontAwesomeIcon icon={faPalette} className="me-2" /> Drawings
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              
              <Tab.Pane eventKey="code_friendly" className="py-4">
                <ContractsTable />
              </Tab.Pane>
              <Tab.Pane eventKey="user_experience" className="py-4">
                <DrawingsTable />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
        </Card.Body>
      </Card>
     
      {/* <TransactionsTable /> */}
    </>
  );
};
