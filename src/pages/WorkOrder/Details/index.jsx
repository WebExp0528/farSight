import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRedux } from '@redux';
import { get as getWorkOrderDetail } from '@redux/workOrderDetail/actions';
import { ContentLoader, RenderRoutes } from 'components';
import ModalUpdateStatus from '../components/ModalUpdateStatus';
import ActionMenu from './ActionMenu';

import { useShowScroll, useIsOpenControls } from 'hooks';
import { getStatus, getStatusClass } from 'helpers';
import { getWonID } from './helper';

const WorkOrderDetails = props => {
  const { match, routes = [], history } = props;
  const wonId = getWonID(props);

  const wonState = useRedux('workOrderDetail');
  const { data: won = {} } = wonState;

  const d = useDispatch();
  const scrollControl = useIsOpenControls();
  const statusModalControl = useIsOpenControls();
  const actionMenuRef = React.useRef();

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
          <Button variant="primary" size="sm" onClick={statusModalControl.handleOpen}>
            <FontAwesomeIcon icon={['fas', 'history']} flip="horizontal" /> Expected on Time
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge bg="primary">{`Due: ${new Date(won.due_date).toDateString()}`}</Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge bg={getStatusClass(won.due_date)}>{getItemStatus()}</Badge>
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
      <ActionMenu />

      {/* <Overlay
        placement="top"
        target={actionMenuRef}
        show={scrollControl.isOpen}
        // onHide={() => console.log('hideNav')}
      >
        <Popover id="nav-popover" className="alert-info">
          <Popover.Content>
            <FontAwesomeIcon icon={['fas', 'angle-double-down']} size="2x" />
            &nbsp;&nbsp;Scroll down to read all instructions.
          </Popover.Content>
        </Popover>
      </Overlay> */}
      <ModalUpdateStatus won={won} {...statusModalControl} />
    </Container>
  );
};

export default WorkOrderDetails;
