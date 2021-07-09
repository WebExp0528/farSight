import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Card } from 'react-bootstrap';
import { ContentLoader } from 'components';
import { useRedux, useReduxLoading } from '@redux';
import { get as getWorkOrderBids } from '@redux/workOrderBids/actions';
import BidCard from './BidCard';
import ModalCreateBidItem from './ModalCreateBidItem';

import { getWonID } from '../helper';
import { useIsOpenControls } from 'hooks/useIsOpenControl';

export const BidsScreen = props => {
  const wonId = getWonID(props);

  const createBitItemModalControl = useIsOpenControls();

  const d = useDispatch();
  const workOrderBidsState = useRedux('workOrderBids');

  React.useEffect(() => {
    refreshWorkOrderBids();
  }, [wonId]);

  const refreshWorkOrderBids = () => {
    d(getWorkOrderBids(wonId));
  };

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
        <Card.Header className="text-light bg-info d-flex flex-row">
          <h5 className="col align-items-center mb-0">Bid Items</h5>
          <h5 className="col align-items-center mb-0 text-right">{`Total = $${totalPrice}`}</h5>
        </Card.Header>
        <Card.Body>
          {bidsData.map((item, index) => {
            return <BidCard key={index} item={item} onRefresh={refreshWorkOrderBids} />;
          })}
        </Card.Body>
        <Card.Footer className="d-flex flex-row">
          <Button className="col mx-2" variant="success" onClick={createBitItemModalControl.handleOpen}>
            Add Bid Item
          </Button>
          {/* <Button className="col mx-2">Finish and Submit</Button> */}
        </Card.Footer>
      </Card>
      <ModalCreateBidItem onRefresh={refreshWorkOrderBids} {...createBitItemModalControl} />
    </React.Fragment>
  );
};

export default BidsScreen;
