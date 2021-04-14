import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCaretRight, faCaretDown, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { Badge, Card, Container, Row, Col, Nav, Tab, Popover, Overlay, Accordion, Button } from 'react-bootstrap';

import { get as getWorkOrderDetail } from '@redux/workOrderDetail/actions';
import { ContentLoader } from 'component';

import BidsScreen from '../BidsFeature/BidsScreen';
import { SubmitWorkOrder } from './components';

import CreateBidItem from '../BidsFeature/CreateBidItem';
import StatusScreen from '../StatusScreen';
import PhotoScreen from '../UploadPhotos/PhotosScreen';

class WorkOrderDetails extends Component {
  wonId = null;
  state = {
    key: 'details',
    showNav: false,
    isOpen: false,
    ispageStatus: false,
    menuCaret: faCaretRight,
    showScroll: true,
    hideScroll: false
  };

  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
    this.wonId = props.match.params.won;
    this.props.getWorkOrderDetail(this.wonId);
  }
  toggleMenuCaret = eventKey => {
    if (this.state.menuCaret === faCaretRight) {
      this.setState({ menuCaret: faCaretDown });
    } else {
      this.setState({ menuCaret: faCaretRight });
    }
  };
  navSelected = selectedKey => {
    this.setState((state, props) => {
      return { key: selectedKey, showNav: false };
    });
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };
  componentDidUpdate = () => {
    let shouldShowScroll = this.showScroll();
    if (this.state.showScroll !== shouldShowScroll) {
      this.setState({ showScroll: shouldShowScroll });
    }
  };
  showScroll = () => {
    return document.body.scrollHeight > window.innerHeight && !this.state.hideScroll;
  };
  handleScroll = event => {
    this.setState({ hideScroll: true });
  };
  togglePopup = isOpen => {
    this.setState(!isOpen);
  };
  getItemStatus = item => {
    let dueDate = new Date(item.due_date);
    let today = new Date();
    let statusMessage = 'Unknown';
    if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
      statusMessage = 'Pending';
      return statusMessage;
    }
    if (dueDate.getDate() > today) {
      statusMessage = 'On Time';
    }
    if (dueDate.getDate() === today) {
      statusMessage = 'Due Today';
    }
    if (dueDate < today) {
      statusMessage = 'Past Due';
    }
    return statusMessage;
  };
  getItemStatusBadgeClass = item => {
    let status = this.getItemStatus(item);
    let itemClass = 'primary';
    switch (status) {
      case 'On Time':
        itemClass = 'success';
        break;
      case 'Due Today':
        itemClass = 'warning';
        break;
      case 'Past Due':
        itemClass = 'danger';
        break;
      default:
        itemClass = 'secondary';
    }

    return itemClass;
  };
  renderHeader = item => {
    return (
      <>
        <Card style={{ marginBottom: '0.5em' }}>
          <Card.Img style={{ maxHeight: '200px' }} variant="top" src={item.image_url_small} />
          <Card.ImgOverlay style={{ paddingTop: '160px' }}>
            <Badge variant="primary">Due: {new Date(item.due_date).toDateString()}</Badge>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Badge variant={this.getItemStatusBadgeClass(item)}>{this.getItemStatus(item)}</Badge>
          </Card.ImgOverlay>
        </Card>

        <Row>
          <Col>
            <h5>
              <Link to={this.props.match.url}>{item.work_ordered}</Link>
            </h5>
          </Col>
          <Col>
            <h6>
              <a href={'geo://' + item.gps_latitude + ',' + item.gps_longitude}>
                {item.address_street}
                <br />
                {item.address_city}, {item.address_state}
              </a>
            </h6>
          </Col>
        </Row>
      </>
    );
  };
  renderCard = item => {
    return (
      <div key={'WO' + item.won}>
        <Card style={{ marginBottom: '0.5em' }}>
          <Card.Header style={{ padding: '0.25em' }}>INSTRUCTIONS</Card.Header>
          <Card.Body style={{ padding: '0.25em' }}>
            {item.instructions_full &&
              item.instructions_full.map((i, index) => {
                return (
                  <React.Fragment key={index}>
                    <h5>
                      {i.action} - {i.type}
                    </h5>
                    <Card.Text style={{ padding: '0.25em' }}>{i.instruction}</Card.Text>
                    <br />
                  </React.Fragment>
                );
              })}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <b>Last Status Update</b>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {item.last_status_update ? (
              <>
                <Row>
                  <Col>
                    <b>Status</b>
                  </Col>
                  <Col>{item.last_status_update.order_status}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <b>Delay Reason</b>
                  </Col>
                  <Col>{item.last_status_update.delay_reason}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <b>Expected Completion Date</b>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    {item.last_status_update.expected_completion_date
                      ? item.last_status_update.expected_completion_date
                      : item.due_date}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <b>Explanation</b>
                  </Col>
                </Row>
                <Row>
                  <Col>{item.last_status_update.explanation}</Col>
                </Row>
              </>
            ) : (
              <h6>This work order has not been updated.</h6>
            )}
          </Card.Body>
        </Card>
        <Row>
          <br />
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <br />
        </Row>
      </div>
    );
  };
  render() {
    this.wonId = this.props.match.params.won;
    const { isOpen, ispageStatus } = this.state;

    const { data: won } = this.props.won;
    const { instructions_full } = won;
    const dueDate = new Date(won.due_date);
    const navClick = e => {
      return this.setState((state, props) => {
        return { showNav: !state.showNav };
      });
    };
    return (
      <Container>
        {this.renderHeader(won)}
        <Tab.Container id="woTabs" defaultActiveKey="details" activeKey={this.state.key}>
          <Tab.Content>
            <Tab.Pane eventKey="details">
              {this.props.won.isLoading ? (
                <ContentLoader>Loading Work Order Details...</ContentLoader>
              ) : (
                this.renderCard(won)
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="update">
              <StatusScreen won={this.wonId} dueDate={dueDate ? dueDate.toISOString().slice(0, 10) : null} />
            </Tab.Pane>
            <Tab.Pane eventKey="bids">
              <BidsScreen
                won={this.wonId}
                tabChange={key => {
                  this.navSelected(key);
                }}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="createBid">
              <CreateBidItem won={this.wonId} />
            </Tab.Pane>
            <Tab.Pane eventKey="before-photos">
              <PhotoScreen won={this.wonId} category="before" />
            </Tab.Pane>
            <Tab.Pane eventKey="during-photos">
              <PhotoScreen won={this.wonId} category="during" />
            </Tab.Pane>
            <Tab.Pane eventKey="after-photos">
              <PhotoScreen won={this.wonId} category="after" />
            </Tab.Pane>

            <Tab.Pane eventKey="survey">
              <SubmitWorkOrder won={this.wonId} surveyName={won.survey_name} />
            </Tab.Pane>
            <Tab.Pane eventKey="submit">
              <SubmitWorkOrder won={this.wonId} surveyName="FinalCheck" />
            </Tab.Pane>
          </Tab.Content>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Accordion defaultActiveKey="orderActions">
            <Card className="fixed-bottom" bg="secondary" block fill>
              <Accordion.Toggle
                as={Button}
                block
                eventKey="orderActions"
                onClick={this.toggleMenuCaret}
                variant="dark-outline"
                ref={ref => {
                  this.buttonRef = ref;
                }}
              >
                Actions Menu...
                <FontAwesomeIcon className="float-right" icon={this.state.menuCaret} />
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="orderActions">
                <Card.Footer>
                  <Nav justify activeKey={this.state.key} onSelect={this.navSelected} variant="pills">
                    <Container>
                      <Row>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="before-photos">
                              Before Photos
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="survey">
                              Submit Survey
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="during-photos">
                              During Photos
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="bids">
                              Add Bids
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="after-photos">
                              After Photos
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                        <Col>
                          <Nav.Item>
                            <Nav.Link as={Button} size="sm" block eventKey="submit">
                              Review &amp; Submit
                            </Nav.Link>
                          </Nav.Item>
                        </Col>
                      </Row>
                    </Container>
                  </Nav>
                </Card.Footer>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Overlay
            placement="top"
            target={this.buttonRef}
            show={this.state.showScroll}
            onHide={() => console.log('hideNav')}
          >
            <Popover id="nav-popover" className="alert-info">
              <Popover.Content>
                <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
                &nbsp;&nbsp;Scroll down to read all instructions.
              </Popover.Content>
            </Popover>
          </Overlay>
        </Tab.Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ won: state.workOrderDetail });

export default connect(mapStateToProps, { getWorkOrderDetail })(WorkOrderDetails);
