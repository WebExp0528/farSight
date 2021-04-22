import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { get as getWorkOrderDetail } from '@redux/workOrderDetail/actions';
import { useIsOpenControls } from 'hooks/useIsOpenControl';
import { useShowScroll } from 'hooks';

import { faCaretRight, faCaretDown, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { Badge, Card, Container, Row, Col, Nav, Tab, Popover, Overlay, Accordion, Button } from 'react-bootstrap';

import { AccordionToggleCaret, ContentLoader, RenderRoutes } from 'component';

import BidsScreen from './BidsScreen';
import SubmitWorkOrder from './SubmitWorkOrder';

import CreateBidItem from './CreateBidItem';
import StatusScreen from '../../StatusScreen';
import PhotoScreen from './PhotosScreen';
import { useRedux } from '@redux';
import { getStatus, getStatusClass } from 'helpers';
import { Link, NavLink } from 'react-router-dom';

const WorkOrderDetails = props => {
  const { match, routes = [] } = props;
  const wonId = match?.params?.won || null;

  const wonState = useRedux('workOrderDetail');
  const { data: won = {} } = wonState;

  const d = useDispatch();
  const scrollControl = useIsOpenControls();
  const detailButtonRef = React.useRef();

  React.useEffect(() => {
    d(getWorkOrderDetail(wonId));
    window.addEventListener('scroll', handleScroll);
  }, []);

  useShowScroll(() => {
    scrollControl.handleOpen();
  });

  const handleScroll = event => {
    scrollControl.handleClose();
  };

  if (wonState.isLoading) {
    return <ContentLoader>Loading Work Order Details...</ContentLoader>;
  }

  const getItemStatus = () => {
    if (won.approval_status === 'Pre-Pending' || won.approval_status === 'Pending') {
      return 'Pending';
    }
    return getStatus(won.due_date);
  };

  return (
    <Container>
      <Card style={{ marginBottom: '0.5em' }}>
        <Card.Img style={{ maxHeight: '200px' }} variant="top" src={won.image_url_small} />
        <Card.ImgOverlay style={{ paddingTop: '160px' }}>
          <Badge variant="primary">{`Due: ${new Date(won.due_date).toDateString()}`}</Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge variant={getStatusClass(won.due_date)}>{getItemStatus()}</Badge>
        </Card.ImgOverlay>
      </Card>
      <Row>
        <h5 className="col">
          <Link to={match.url}>{won.work_ordered}</Link>
        </h5>
        <h6 className="col">
          <a href={`geo://${won.gps_latitude},${won.gps_longitude}`}>
            {won.address_street}
            <br />
            {`${won.address_city}, ${won.address_state}`}
          </a>
        </h6>
      </Row>
      <Row style={{ marginBottom: '150px' }}>
        <Col>
          <RenderRoutes routes={routes} />
        </Col>
      </Row>
      <Accordion defaultActiveKey="orderActions">
        <Card className="fixed-bottom" bg="secondary">
          <AccordionToggleCaret block eventKey="orderActions" variant="dark-outline" ref={detailButtonRef}>
            Actions Menu...
          </AccordionToggleCaret>
          <Accordion.Collapse eventKey="orderActions">
            <Card.Footer>
              <Nav justify variant="pills">
                <Container>
                  <Row>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/photos/before`}>
                          <Nav.Link as={Button} size="sm" block eventKey="before-photos">
                            Before Photos
                          </Nav.Link>
                        </Link>
                      </Nav.Item>
                    </Col>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/submit/pool`}>
                          <Nav.Link as={Button} size="sm" block eventKey="survey">
                            Submit Survey
                          </Nav.Link>
                        </Link>
                      </Nav.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/photos/during`}>
                          <Nav.Link as={Button} size="sm" block eventKey="during-photos">
                            During Photos
                          </Nav.Link>
                        </Link>
                      </Nav.Item>
                    </Col>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/bids`}>
                          <Nav.Link as={Button} size="sm" block eventKey="bids">
                            Add Bids
                          </Nav.Link>
                        </Link>
                      </Nav.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/photos/after`}>
                          <Nav.Link as={Button} size="sm" block eventKey="after-photos">
                            After Photos
                          </Nav.Link>
                        </Link>
                      </Nav.Item>
                    </Col>
                    <Col>
                      <Nav.Item>
                        <Link to={`${match.url}/submit/final`}>
                          <Nav.Link as={Button} size="sm" block eventKey="submit">
                            Review &amp; Submit
                          </Nav.Link>
                        </Link>
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
        target={detailButtonRef}
        show={scrollControl.isOpen}
        // onHide={() => console.log('hideNav')}
      >
        <Popover id="nav-popover" className="alert-info">
          <Popover.Content>
            <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
            &nbsp;&nbsp;Scroll down to read all instructions.
          </Popover.Content>
        </Popover>
      </Overlay>
    </Container>
  );
};

export default WorkOrderDetails;
