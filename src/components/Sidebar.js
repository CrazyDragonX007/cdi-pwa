import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import {useHistory, useLocation} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBoxOpen,
  faChartPie,
  faCog,
  faFileAlt,
  faHandHoldingUsd,
  faSignOutAlt,
  faTable,
  faTimes,
  faCalendarAlt,
  faMapPin,
  faInbox,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

import logoImg from "../assets/img/image.png";
// const logoImg = "../assets/img/cdi-logo.jpg";

export default (props = {}) => {
  const history = useHistory();
  const [accessRole, setAccessRole] = useState(localStorage.getItem('accessRole'));
  //TODO: Set role based access here
  console.log(accessRole);
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={100}
                height={40}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };
  if (accessRole == '0') {
    return (
        <>
          <Navbar
              expand={false}
              collapseOnSelect
              variant="light"
              className="navbar-theme-sometextcolor d-md-none px-4"
          >
            <Navbar.Brand
                className="me-lg-5"
                as={Link}
                to={Routes.DashboardOverview.path}
            >
              <Image src={ReactHero} className="navbar-brand-light" />
            </Navbar.Brand>
            <Navbar.Toggle
                as={Button}
                aria-controls="main-navbar"
                onClick={onCollapse}
            >
              <span className="navbar-toggler-icon" />
            </Navbar.Toggle>
          </Navbar>
          <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
            <SimpleBar
                className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
            >
              <div className="sidebar-inner px-4 pt-3">
                <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                  <div className="d-flex align-items-center">
                    <div className="user-avatar lg-avatar me-4">

                    </div>
                    <div className="d-block">
                      {/*<h6>Hi, Jane</h6>*/}
                      {/*<Button*/}
                      {/*    as={Link}*/}
                      {/*    variant="secondary"*/}
                      {/*    size="xs"*/}
                      {/*    to={Routes.Signin.path}*/}
                      {/*    className="text-dark"*/}
                      {/*>*/}
                      {/*  <FontAwesomeIcon icon={faSignOutAlt} className="" />{" "}*/}
                      {/*  Sign Out*/}
                      {/*</Button>*/}
                    </div>
                  </div>
                  <Nav.Link
                      className="collapse-close d-md-none"
                      onClick={onCollapse}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link>
                </div>
                <Nav className="flex-column pt-md-0 pt-3 ">
                  <NavItem link={Routes.DashboardOverview.path} image={logoImg}/>

                  {/*<NavItem*/}
                  {/*    title="Overview"*/}
                  {/*    link={Routes.DashboardOverview.path}*/}
                  {/*    icon={faChartPie}*/}
                  {/*/>*/}
                  {/* <NavItem
                external
                title="Messages"
                link="https://demo.themesberg.com/volt-pro-react/#/messages"
                target="_blank"
                badgeText="Pro"
                icon={faInbox}
              /> */}
                  <NavItem
                      title="Inspection Forms"
                      icon={faHandHoldingUsd}
                      link={Routes.VehicleInspectionForms.path}
                  />
                  <NavItem
                      title="Moving Forms"
                      icon={faHandHoldingUsd}
                      link={Routes.VehicleMovingForm.path}
                  />
                  <NavItem
                      title="Daily Reports"
                      icon={faHandHoldingUsd}
                      link={Routes.DailyReports.path}
                  />

                  <NavItem
                      title="Incident Reports"
                      icon={faHandHoldingUsd}
                      link={Routes.IncidentReportForm.path}
                  />
                  <NavItem
                      title="Truck Inspection"
                      icon={faHandHoldingUsd}
                      link={Routes.TruckInspectionForm.path}
                  />

                  <CollapsableNavItem
                      eventKey="forms/"
                      title="Forms"
                      icon={faTable}
                  >
                    <NavItem
                        title="Inspection Form"
                        icon={faCog}
                        link={Routes.VIForm.path}
                    />
                    <NavItem
                        title="Moving Form"
                        icon={faCog}
                        link={Routes.VMForm.path}
                    />
                    <NavItem
                        title="Daily Report"
                        icon={faCog}
                        link={Routes.DRForm.path}
                    />
                    <NavItem
                        title="Incident Report"
                        icon={faCog}
                        link={Routes.IRForm.path}
                    />
                    <NavItem
                        title="Truck Inspection"
                        icon={faCog}
                        link={Routes.TIForm.path}
                    />
                  </CollapsableNavItem>

                  {/*<NavItem*/}
                  {/*  title="Project Details"*/}
                  {/*  icon={faHandHoldingUsd}*/}
                  {/*  link={Routes.ProjectDetails.path}*/}
                  {/*/>*/}
                  <NavItem
                      title="Projects"
                      icon={faHandHoldingUsd}
                      link={Routes.Projects.path}
                  />
                  {/* <NavItem
                external
                title="Calendar"
                link="https://demo.themesberg.com/volt-pro-react/#/calendar"
                target="_blank"
                badgeText="Pro"
                icon={faCalendarAlt}
              />
              <NavItem
                external
                title="Map"
                link="https://demo.themesberg.com/volt-pro-react/#/map"
                target="_blank"
                badgeText="Pro"
                icon={faMapPin}
              /> */}

                  {/* <CollapsableNavItem
                eventKey="tables/"
                title="Tables"
                icon={faTable}
              >
                <NavItem
                  title="Bootstrap Table"
                  link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem> */}

                  <CollapsableNavItem
                      eventKey="examples/"
                      title="Auth"
                      icon={faFileAlt}
                  >
                    <NavItem title="Sign In" link={Routes.Signin.path} />
                    <NavItem title="Sign Up" link={Routes.Signup.path} />
                    <NavItem
                        title="Forgot password"
                        link={Routes.ForgotPassword.path}
                    />
                    {/* <NavItem
                  title="Reset password"
                  link={Routes.ResetPassword.path}
                /> */}
                    {/* <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem
                  title="500 Server Error"
                  link={Routes.ServerError.path}
                /> */}
                  </CollapsableNavItem>

                  {/* <NavItem
                external
                title="Plugins"
                link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              /> */}

                  <Dropdown.Divider className="border-indigo my-3" />

                  {/*<CollapsableNavItem*/}
                  {/*  eventKey="documentation/"*/}
                  {/*  title="Getting Started"*/}
                  {/*  icon={faBook}*/}
                  {/*>*/}
                  {/*  /!* <NavItem title="Overview" link={Routes.DocsOverview.path} /> *!/*/}
                  {/*  <NavItem title="Download" link={Routes.DocsDownload.path} />*/}
                  {/*  <NavItem*/}
                  {/*    title="Quick Start"*/}
                  {/*    link={Routes.DocsQuickStart.path}*/}
                  {/*  />*/}
                  {/*  <NavItem title="License" link={Routes.DocsLicense.path} />*/}
                  {/*  <NavItem*/}
                  {/*    title="Folder Structure"*/}
                  {/*    link={Routes.DocsFolderStructure.path}*/}
                  {/*  />*/}
                  {/*  <NavItem title="Build Tools" link={Routes.DocsBuild.path} />*/}
                  {/*  <NavItem title="Changelog" link={Routes.DocsChangelog.path} />*/}
                  {/*</CollapsableNavItem>*/}
                  {/*<CollapsableNavItem*/}
                  {/*  eventKey="components/"*/}
                  {/*  title="Components"*/}
                  {/*  icon={faBoxOpen}*/}
                  {/*>*/}
                  {/*  <NavItem title="Accordion" link={Routes.Accordions.path} />*/}
                  {/*  <NavItem title="Alerts" link={Routes.Alerts.path} />*/}
                  {/*  <NavItem title="Badges" link={Routes.Badges.path} />*/}
                  {/*  <NavItem*/}
                  {/*    external*/}
                  {/*    title="Widgets"*/}
                  {/*    link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"*/}
                  {/*    target="_blank"*/}
                  {/*    badgeText="Pro"*/}
                  {/*  />*/}
                  {/*  <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />*/}
                  {/*  <NavItem title="Buttons" link={Routes.Buttons.path} />*/}
                  {/*  <NavItem title="Forms" link={Routes.Forms.path} />*/}
                  {/*  <NavItem title="Modals" link={Routes.Modals.path} />*/}
                  {/*  <NavItem title="Navbars" link={Routes.Navbars.path} />*/}
                  {/*  <NavItem title="Navs" link={Routes.Navs.path} />*/}
                  {/*  <NavItem title="Pagination" link={Routes.Pagination.path} />*/}
                  {/*  <NavItem title="Popovers" link={Routes.Popovers.path} />*/}
                  {/*  <NavItem title="Progress" link={Routes.Progress.path} />*/}
                  {/*  <NavItem title="Tables" link={Routes.Tables.path} />*/}
                  {/*  <NavItem title="Tabs" link={Routes.Tabs.path} />*/}
                  {/*  <NavItem title="Toasts" link={Routes.Toasts.path} />*/}
                  {/*  <NavItem title="Tooltips" link={Routes.Tooltips.path} />*/}
                  {/*</CollapsableNavItem>*/}
                  {/*<NavItem title="S3" link={Routes.S3.path} />*/}
                  {/* <NavItem
                external
                title="Themesberg"
                link="https://themesberg.com"
                target="_blank"
                image={ThemesbergLogo}
              /> */}
                  <Button


                      variant="secondary"
                      onClick={()=>{
                        localStorage.removeItem('accessRole');
                        localStorage.removeItem('user');
                        history.push('/auth/sign-in');
                      }}
                  >
                    <FontAwesomeIcon icon={faRocket} className="me-1" /> Logout
                  </Button>
                </Nav>
              </div>
            </SimpleBar>
          </CSSTransition>
        </>
    );
  }
  if (accessRole == '1'){
    return (
        <>
          <Navbar
              expand={false}
              collapseOnSelect
              variant="light"
              className="navbar-theme-sometextcolor d-md-none px-4"
          >
            <Navbar.Brand
                className="me-lg-5"
                as={Link}
                to={Routes.DashboardOverview.path}
            >
              <Image src={ReactHero} className="navbar-brand-light" />
            </Navbar.Brand>
            <Navbar.Toggle
                as={Button}
                aria-controls="main-navbar"
                onClick={onCollapse}
            >
              <span className="navbar-toggler-icon" />
            </Navbar.Toggle>
          </Navbar>
          <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
            <SimpleBar
                className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
            >
              <div className="sidebar-inner px-4 pt-3">
                <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                  <div className="d-flex align-items-center">
                    {/*<div className="user-avatar lg-avatar me-4">*/}
                    {/*  <Image*/}
                    {/*      src={ProfilePicture}*/}
                    {/*      className="card-img-top rounded-circle border-white"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className="d-block">*/}
                    {/*  <h6>Hi, Jane</h6>*/}
                    {/*  <Button*/}
                    {/*      as={Link}*/}
                    {/*      variant="secondary"*/}
                    {/*      size="xs"*/}
                    {/*      to={Routes.Signin.path}*/}
                    {/*      className="text-dark"*/}
                    {/*  >*/}
                    {/*    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}*/}
                    {/*    Sign Out*/}
                    {/*  </Button>*/}
                    {/*</div>*/}
                  </div>
                  <Nav.Link
                      className="collapse-close d-md-none"
                      onClick={onCollapse}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link>
                </div>
                <Nav className="flex-column pt-md-0 pt-3 ">
                  <NavItem link={Routes.DashboardOverview.path} image={logoImg}/>

                  {/*<NavItem*/}
                  {/*    title="Overview"*/}
                  {/*    link={Routes.DashboardOverview.path}*/}
                  {/*    icon={faChartPie}*/}
                  {/*/>*/}
                  {/* <NavItem
                external
                title="Messages"
                link="https://demo.themesberg.com/volt-pro-react/#/messages"
                target="_blank"
                badgeText="Pro"
                icon={faInbox}
              /> */}
                  <NavItem
                      title="Inspection Forms"
                      icon={faHandHoldingUsd}
                      link={Routes.VehicleInspectionForms.path}
                  />
                  <NavItem
                      title="Moving Forms"
                      icon={faHandHoldingUsd}
                      link={Routes.VehicleMovingForm.path}
                  />
                  <NavItem
                      title="Daily Reports"
                      icon={faHandHoldingUsd}
                      link={Routes.DailyReports.path}
                  />

                  <NavItem
                      title="Incident Reports"
                      icon={faHandHoldingUsd}
                      link={Routes.IncidentReportForm.path}
                  />
                  <NavItem
                      title="Truck Inspection"
                      icon={faHandHoldingUsd}
                      link={Routes.TruckInspectionForm.path}
                  />

                  <CollapsableNavItem
                      eventKey="forms/"
                      title="Forms"
                      icon={faTable}
                  >
                    <NavItem
                        title="Inspection Form"
                        icon={faCog}
                        link={Routes.VIForm.path}
                    />
                    <NavItem
                        title="Moving Form"
                        icon={faCog}
                        link={Routes.VMForm.path}
                    />
                    <NavItem
                        title="Daily Report"
                        icon={faCog}
                        link={Routes.DRForm.path}
                    />
                    <NavItem
                        title="Incident Report"
                        icon={faCog}
                        link={Routes.IRForm.path}
                    />
                    <NavItem
                        title="Truck Inspection"
                        icon={faCog}
                        link={Routes.TIForm.path}
                    />
                  </CollapsableNavItem>

                  {/*<NavItem*/}
                  {/*  title="Project Details"*/}
                  {/*  icon={faHandHoldingUsd}*/}
                  {/*  link={Routes.ProjectDetails.path}*/}
                  {/*/>*/}
                  <NavItem
                      title="Projects"
                      icon={faHandHoldingUsd}
                      link={Routes.Projects.path}
                  />
                  {/* <NavItem
                external
                title="Calendar"
                link="https://demo.themesberg.com/volt-pro-react/#/calendar"
                target="_blank"
                badgeText="Pro"
                icon={faCalendarAlt}
              />
              <NavItem
                external
                title="Map"
                link="https://demo.themesberg.com/volt-pro-react/#/map"
                target="_blank"
                badgeText="Pro"
                icon={faMapPin}
              /> */}

                  {/* <CollapsableNavItem
                eventKey="tables/"
                title="Tables"
                icon={faTable}
              >
                <NavItem
                  title="Bootstrap Table"
                  link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem> */}

                  <CollapsableNavItem
                      eventKey="examples/"
                      title="Auth"
                      icon={faFileAlt}
                  >
                    <NavItem title="Sign In" link={Routes.Signin.path} />
                    <NavItem title="Sign Up" link={Routes.Signup.path} />
                    <NavItem
                        title="Forgot password"
                        link={Routes.ForgotPassword.path}
                    />
                    {/* <NavItem
                  title="Reset password"
                  link={Routes.ResetPassword.path}
                /> */}
                    {/* <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem
                  title="500 Server Error"
                  link={Routes.ServerError.path}
                /> */}
                  </CollapsableNavItem>

                  {/* <NavItem
                external
                title="Plugins"
                link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              /> */}

                  <Dropdown.Divider className="border-indigo my-3" />

                  {/*<CollapsableNavItem*/}
                  {/*  eventKey="documentation/"*/}
                  {/*  title="Getting Started"*/}
                  {/*  icon={faBook}*/}
                  {/*>*/}
                  {/*  /!* <NavItem title="Overview" link={Routes.DocsOverview.path} /> *!/*/}
                  {/*  <NavItem title="Download" link={Routes.DocsDownload.path} />*/}
                  {/*  <NavItem*/}
                  {/*    title="Quick Start"*/}
                  {/*    link={Routes.DocsQuickStart.path}*/}
                  {/*  />*/}
                  {/*  <NavItem title="License" link={Routes.DocsLicense.path} />*/}
                  {/*  <NavItem*/}
                  {/*    title="Folder Structure"*/}
                  {/*    link={Routes.DocsFolderStructure.path}*/}
                  {/*  />*/}
                  {/*  <NavItem title="Build Tools" link={Routes.DocsBuild.path} />*/}
                  {/*  <NavItem title="Changelog" link={Routes.DocsChangelog.path} />*/}
                  {/*</CollapsableNavItem>*/}
                  {/*<CollapsableNavItem*/}
                  {/*  eventKey="components/"*/}
                  {/*  title="Components"*/}
                  {/*  icon={faBoxOpen}*/}
                  {/*>*/}
                  {/*  <NavItem title="Accordion" link={Routes.Accordions.path} />*/}
                  {/*  <NavItem title="Alerts" link={Routes.Alerts.path} />*/}
                  {/*  <NavItem title="Badges" link={Routes.Badges.path} />*/}
                  {/*  <NavItem*/}
                  {/*    external*/}
                  {/*    title="Widgets"*/}
                  {/*    link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"*/}
                  {/*    target="_blank"*/}
                  {/*    badgeText="Pro"*/}
                  {/*  />*/}
                  {/*  <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />*/}
                  {/*  <NavItem title="Buttons" link={Routes.Buttons.path} />*/}
                  {/*  <NavItem title="Forms" link={Routes.Forms.path} />*/}
                  {/*  <NavItem title="Modals" link={Routes.Modals.path} />*/}
                  {/*  <NavItem title="Navbars" link={Routes.Navbars.path} />*/}
                  {/*  <NavItem title="Navs" link={Routes.Navs.path} />*/}
                  {/*  <NavItem title="Pagination" link={Routes.Pagination.path} />*/}
                  {/*  <NavItem title="Popovers" link={Routes.Popovers.path} />*/}
                  {/*  <NavItem title="Progress" link={Routes.Progress.path} />*/}
                  {/*  <NavItem title="Tables" link={Routes.Tables.path} />*/}
                  {/*  <NavItem title="Tabs" link={Routes.Tabs.path} />*/}
                  {/*  <NavItem title="Toasts" link={Routes.Toasts.path} />*/}
                  {/*  <NavItem title="Tooltips" link={Routes.Tooltips.path} />*/}
                  {/*</CollapsableNavItem>*/}
                  {/*<NavItem title="S3" link={Routes.S3.path} />*/}
                  {/* <NavItem
                external
                title="Themesberg"
                link="https://themesberg.com"
                target="_blank"
                image={ThemesbergLogo}
              /> */}
                  <Button


                      variant="secondary"
                      onClick={()=>{
                        localStorage.removeItem('accessRole');
                        localStorage.removeItem('user');
                        history.push('/auth/sign-in');
                      }}
                  >
                    <FontAwesomeIcon icon={faRocket} className="me-1" /> Logout
                  </Button>
                </Nav>
              </div>
            </SimpleBar>
          </CSSTransition>
        </>
    );
  }
  else {
    return (
        <>
          <Navbar
              expand={false}
              collapseOnSelect
              variant="light"
              className="navbar-theme-sometextcolor d-md-none px-4"
          >
            <Navbar.Brand
                className="me-lg-5"
                as={Link}
                to={Routes.DashboardOverview.path}
            >
              <Image src={ReactHero} className="navbar-brand-light" />
            </Navbar.Brand>
            <Navbar.Toggle
                as={Button}
                aria-controls="main-navbar"
                onClick={onCollapse}
            >
              <span className="navbar-toggler-icon" />
            </Navbar.Toggle>
          </Navbar>
          <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
            <SimpleBar
                className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
            >
              <div className="sidebar-inner px-4 pt-3">
                <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                  <div className="d-flex align-items-center">
                    {/*<div className="user-avatar lg-avatar me-4">*/}
                    {/*  <Image*/}
                    {/*      src={ProfilePicture}*/}
                    {/*      className="card-img-top rounded-circle border-white"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className="d-block">*/}
                    {/*  <h6>Hi, Jane</h6>*/}
                    {/*  <Button*/}
                    {/*      as={Link}*/}
                    {/*      variant="secondary"*/}
                    {/*      size="xs"*/}
                    {/*      to={Routes.Signin.path}*/}
                    {/*      className="text-dark"*/}
                    {/*  >*/}
                    {/*    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}*/}
                    {/*    Sign Out*/}
                    {/*  </Button>*/}
                    {/*</div>*/}
                  </div>
                  <Nav.Link
                      className="collapse-close d-md-none"
                      onClick={onCollapse}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link>
                </div>
                <Nav className="flex-column pt-md-0 pt-3 ">
                  <NavItem link={Routes.DashboardOverview.path} image={logoImg}/>

                  <NavItem
                      title="Overview"
                      link={Routes.DashboardOverview.path}
                      icon={faChartPie}
                  />



                  <CollapsableNavItem
                      eventKey="forms/"
                      title="Forms"
                      icon={faTable}
                  >
                    <NavItem
                        title="VI Form"
                        icon={faCog}
                        link={Routes.VIForm.path}
                    />
                    <NavItem
                        title="VM Form"
                        icon={faCog}
                        link={Routes.VMForm.path}
                    />
                    <NavItem
                        title="DR Form"
                        icon={faCog}
                        link={Routes.DRForm.path}
                    />
                    <NavItem
                        title="IR Form"
                        icon={faCog}
                        link={Routes.IRForm.path}
                    />
                    <NavItem
                        title="Truck Inspection"
                        icon={faCog}
                        link={Routes.TIForm.path}
                    />
                  </CollapsableNavItem>

                  {/*<NavItem*/}
                  {/*  title="Project Details"*/}
                  {/*  icon={faHandHoldingUsd}*/}
                  {/*  link={Routes.ProjectDetails.path}*/}
                  {/*/>*/}
                  <NavItem
                      title="Projects"
                      icon={faHandHoldingUsd}
                      link={Routes.Projects.path}
                  />


                  <CollapsableNavItem
                      eventKey="examples/"
                      title="Auth"
                      icon={faFileAlt}
                  >
                    <NavItem title="Sign In" link={Routes.Signin.path} />
                    <NavItem title="Sign Up" link={Routes.Signup.path} />
                    <NavItem
                        title="Forgot password"
                        link={Routes.ForgotPassword.path}
                    />

                  </CollapsableNavItem>



                  <Dropdown.Divider className="border-indigo my-3" />


                  <Button


                      variant="secondary"
                      onClick={()=>{
                        localStorage.removeItem('accessRole');
                        localStorage.removeItem('user');
                        history.push('/auth/sign-in');
                      }}
                  >
                    <FontAwesomeIcon icon={faRocket} className="me-1" /> Logout
                  </Button>
                </Nav>
              </div>
            </SimpleBar>
          </CSSTransition>
        </>
    );
  }

};
