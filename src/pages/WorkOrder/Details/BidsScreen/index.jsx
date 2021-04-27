import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { ContentLoader } from 'component';
import { useRedux, useReduxLoading } from '@redux';
import { get as getWorkOrderBids } from '@redux/workOrderBids/actions';
import { getWonID } from '../helper';
import BidCard from './BidCard';

export const BidsScreen = props => {
  const wonId = getWonID(props);

  const d = useDispatch();

  React.useEffect(() => {
    d(getWorkOrderBids(wonId));
  }, [wonId]);

  const workOrderBidsState = useRedux('workOrderBids');

  if (useReduxLoading('workOrderBids')) {
    return <ContentLoader>Loading Bid Items...</ContentLoader>;
  }

  const bidsData = workOrderBidsState?.data || [];

  let totalPrice = 0;
  bidsData.map(item => {
    totalPrice += item.total_price;
    return item;
  });
  return (
    <React.Fragment>
      <Card className="border border-primary">
        <Card.Header className="bg-info d-flex flex-row">
          <h5 className="col align-items-center mb-0">Bid Items</h5>
          <h5 className="col align-items-center mb-0 text-right">{`Total = $${totalPrice}`}</h5>
        </Card.Header>
        <Card.Body>
          {bidsData.map((item, index) => {
            return <BidCard key={index} item={{ ...item }} />;
          })}
        </Card.Body>
        <Card.Footer className="d-flex flex-row">
          <Button className="col m-2" variant="success">
            Add Bid Item
          </Button>
          <Button className="col m-2">Finish and Submit</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default BidsScreen;
