import React, { Component, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHistory,
  faEye,
  faChessRook,
  faPaperPlane,
  faBackward,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  Card,
  Container,
  Row,
  Col,
  Form,
  Image,
  InputGroup,
  Spinner,
  Navbar,
  Nav,
  NavDropdown,
  Tabs,
  Tab,
  Popover,
  Overlay,
  Button,
} from "react-bootstrap";
import { getWorkOrders } from "../store/actions/WorkorderlistAction";
//import './Workorder.css';
import axios from "axios";
import Popup from "../Comman/Popup";

import Bidsscreen from "./Bidsfeature/Bidsscreen";
import Submitworkorder from "./Submitworkorder/Submitworkorder";
import { Body } from "node-fetch";
import Createbiditem from "./Bidsfeature/Createbiditem";
import StatusScreen from "./StatusScreen";
import PhotoScreen from "./UploadPhotos/Photosscreen";
class Workorderdetails extends Component {
  isLoading = true;
  wonId = null;
  state = {
    key: "details",
    showNav: false,
    won: {},
    isOpen: false,
    ispageStatus: false,
  };
  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
  }

  navSelected = (selectedKey) => {
    this.setState((state, props) => {
      return { key: selectedKey, showNav: false };
    });
  };

  componentDidMount() {
    this.wonId = this.props.match.params.won;

    axios
      .get("/api/work_order/" + this.wonId, {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((res) => {
        console.log("success-->", res);
        let obj = res.data;
        this.isLoading = false;
        this.setState((prevState) => ({
          ...prevState,
          won: obj,
        }));
      });
  }

  togglePopup = (isOpen) => {
    this.setState(!isOpen);
  };
  getItemStatus = (item) => {
    let dueDate = new Date(item.due_date);
    let today = new Date();
    let statusMessage = "Unknown";
    if (dueDate.getDate() > today) {
      statusMessage = "On Time";
    }
    if (dueDate.getDate() === today) {
      statusMessage = "Due Today";
    }
    if (dueDate < today) {
      statusMessage = "Past Due";
    }
    return statusMessage;
  };
  getItemStatusBadgeClass = (item) => {
    let status = this.getItemStatus(item);
    let itemClass = "primary";
    switch (status) {
      case "On Time":
        itemClass = "success";
        break;
      case "Due Today":
        itemClass = "warning";
        break;
      case "Past Due":
        itemClass = "danger";
        break;
      default:
        itemClass = "secondary";
        break;
    }

    return itemClass;
  };
  renderCard = (item) => {
    return (
      <div key={"WO" + item.won}>
        <Card style={{ marginBottom: "0.5em" }}>
          <Card.Body style={{ padding: "0.25em" }}>
            <Image
              src={item.image_url_small}
              style={{
                float: "left",
                width: "20%",
                height: "100%",
                margin: "0.25em",
                marginRight: "2em",
              }}
              float="left"
              thumbnail
              roundedCircle
            />
            <Card.Title>
              <Link to={"/Workorderdetails/" + item.won}>
                {item.work_ordered}
              </Link>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.address_street} {item.address_city}, {item.address_state}
            </Card.Subtitle>
            <Card.Text style={{ padding: "0.25em" }}>
              {item.instructions_full
                ? item.instructions_full[0].instruction
                : null}
            </Card.Text>
            <Container>
              <Row>
                <Col xs={5}>
                  <Button
                    variant="success"
                    onClick={() => {
                      this.navSelected("survey");
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    &nbsp;&nbsp;Submit&nbsp;Work
                  </Button>
                </Col>
                <Col xs={2}></Col>
                
              </Row>
            </Container>
          </Card.Body>
          <Card.Footer
            style={{
              padding: "0.5em",
              textAlign: "justify",
            }}
          >
            <span style={{ color: "grey" }}>
              Work&nbsp;Order&nbsp;#{item.won}
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Badge variant="primary">
              Due: {new Date(item.due_date).toDateString()}
            </Badge>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Badge variant={this.getItemStatusBadgeClass(item)}>
              {this.getItemStatus(item)}
            </Badge>
          </Card.Footer>
        </Card>
        <Container>
          <Card>
          <Card.Header>
            Last Status Update
          </Card.Header>
          <Card.Body>
          {item.last_status_update ? (
            <>
              <Row>
                <Col>Order Status</Col>
                <Col>{item.last_status_update.order_status}</Col>
                </Row>
                <Row>
                <Col>Delay Reason : </Col>
                <Col>{item.last_status_update.delay_reason}</Col>
              </Row>
              <Row>
                <Col>Expected Completion Date : </Col>
              </Row>
              <Row>
                <Col>{item.last_status_update.expected_completion_date}</Col>
              </Row>
              <Row>
                <Col>Explanation:</Col>
              </Row>
              <Row>
                <Col>{item.last_status_update.explanation}</Col>
              </Row>
            </>
          ) : (
            <h6>This work order has not been updated.</h6>
          )}
          </Card.Body>
          <Card.Footer>
          <Row>
            <Col >
              <Button className="float-right" onClick={()=>{this.navSelected("update");}}>
                <FontAwesomeIcon icon={faHistory} flip="horizontal" />
                &nbsp;&nbsp;New&nbsp;Status
              </Button>
            </Col>
          </Row>
          </Card.Footer>
          </Card>
        </Container>
      </div>
    );
  };
  render() {
    this.wonId = this.props.match.params.won;
    const { isOpen, ispageStatus } = this.state;
    const { won } = this.props.won;
    const { instructions_full } = won;
    const dueDate = won.due_date;
    const navClick = (e) => {
      return this.setState((state, props) => {
        return { showNav: !state.showNav };
      });
    };
    console.log("workOrder", this.state.won);
    return (
      <div>
        <Button variant="secondary" href="/">
          <FontAwesomeIcon icon={faBackward} />
          Back
        </Button>
        <Tab.Container
          id="woTabs"
          defaultActiveKey="details"
          activeKey={this.state.key}
        >
          <Tab.Content>
            <Tab.Pane eventKey="details">
              {this.isLoading ? (
                <center>
                  <hr />
                  <div>Loading Details...</div>
                  <br />
                  <Spinner animation="border" variant="secondary" />
                  <hr />
                </center>
              ) : (
                this.renderCard(this.state.won)
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="update">
              <StatusScreen
                won={this.wonId}
                dueDate={dueDate ? dueDate.toISOString().slice(0, 10) : null}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="bids">
              <Bidsscreen
                won={this.wonId}
                tabChange={(key) => {
                  this.navSelected(key);
                }}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="createBid">
              <Createbiditem won={this.wonId} />
            </Tab.Pane>
            <Tab.Pane eventKey="photos">
              <PhotoScreen />
            </Tab.Pane>
            <Tab.Pane eventKey="survey">
              <Submitworkorder won={this.wonId} />
            </Tab.Pane>
          </Tab.Content>
          <Navbar fixed="bottom" className="justify-content-center">
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={navClick}
              ref={(ref) => {
                this.buttonRef = ref;
              }}
            >
              {this.state.key}
            </Button>
            <Overlay
              placement="top"
              target={this.buttonRef}
              show={this.state.showNav}
              onHide={() => console.log("hideNav")}
            >
              <Popover id="nav-popover">
                <Popover.Title>Select a section...</Popover.Title>
                <Popover.Content>
                  <Nav
                    fill
                    className="justify-content-center"
                    activeKey={this.state.key}
                    onSelect={this.navSelected}
                    variant="pills"
                    style={{ fontSize: "2em", width: "250px" }}
                  >
                    <FontAwesomeIcon icon={{ faHamburger }} />
                    <Nav.Item>
                      <Nav.Link eventKey="details">Review Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="update">Update Status</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="bids">Add Bids</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="photos">Add Photos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="survey">Submit Work</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Popover.Content>
              </Popover>
            </Overlay>
          </Navbar>
        </Tab.Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ won: state.won });

export default connect(mapStateToProps)(Workorderdetails);
