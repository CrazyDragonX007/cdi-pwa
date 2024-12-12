
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faTruck, faTruckLoading, faTruckPickup, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable, VIFTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import axios from "axios";

require('dotenv').config();


const apiURL = process.env.REACT_APP_BACKEND_URL;
const vifCountAPI = `${apiURL}/crud/countVIF`
const irfCountAPI = `${apiURL}/crud/countIRF`
const vmfCountAPI = `${apiURL}/crud/countVMF`



export default () => {
    const [irfCount, setIrfCount] = useState(0);
    const [vifCount, setVifCount] = useState(0);
    const [vmfCount, setVmfCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response01 = await axios.get(irfCountAPI);
                const response02 = await axios.get(vifCountAPI);
                const response03 = await axios.get(vmfCountAPI);
                setIrfCount(response01.data[0]['count(*)']);
                setVifCount(response02.data[0]['count(*)']);
                setVmfCount(response03.data[0]['count(*)']);

            } catch (error) {
                console.error('Error fetching IRF count:', error);
            }
        };

        fetchCount();
    }, []);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        {/* <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

      <Row className="">
       
        {/* <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Vehicle Inspection Submissions"
            title= {`${vifCount}`}
            // period="Feb 1 - Apr 1"
            // percentage={18.2}
            icon={faTruckLoading}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Vehicle Moving Submissions"
            title={`${vmfCount}`}
            // period="Feb 1 - Apr 1"
            // percentage={28.4}
            icon={faTruckPickup}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
        <CounterWidget
            category="Total Report Submissions"
            title={`${irfCount}`}
            // period="Feb 1 - Apr 1"
            // percentage={28.4}
            icon={faChartLine}
            iconColor="shape-tertiary"
          />
        </Col>
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col> */}

      </Row>
      
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
          <Col xs={12} className="mb-4">
                  <TeamMembersWidget />
                </Col>
              </Row>
            <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                {/*<Col xs={12} className="mb-4">*/}
                {/*  <VIFTable />*/}
                {/*</Col>*/}
                {/* <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col> */}
              </Row>
            </Col>
            
            

            {/* <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  );
};
