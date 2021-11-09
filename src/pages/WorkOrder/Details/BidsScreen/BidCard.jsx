import { Button } from 'react-bootstrap';
import React from 'react';
import classnames from 'classnames';
import cls from './bids-screen.module.scss';
import { useIsOpenControls } from 'hooks/useIsOpenControl';
import ModalDeleteBidItem from './ModalDeleteBidItem';
const BidCard = ({ item, onRefresh, ...rest }) => {
  const {
    // bid_item_number = '',
    item_description = '',
    number_of_units = 0,
    total_price = 0,
    unit_of_measure = '',
    usd_unit_price = 0
  } = item || {};

  const deleteBidItemModalControl = useIsOpenControls();

  return (
    <React.Fragment>
      <div className={classnames('d-flex flex-column p-2', cls.bidCardWrapper)} {...rest}>
        <div>{item_description}</div>
        <div className="d-flex flex-row justify-content-center">
          <div className="flex-grow-1 d-flex align-items-center">{`$${total_price}=${number_of_units} ${unit_of_measure} @ $${usd_unit_price} per ${unit_of_measure}`}</div>
          <Button variant="outline-danger" size="sm" onClick={deleteBidItemModalControl.handleOpen}>
            Cancel Bid
          </Button>
        </div>
      </div>
      <br />
      <ModalDeleteBidItem onRefresh={onRefresh} item={item} {...deleteBidItemModalControl} />
    </React.Fragment>
  );
};

export default BidCard;
