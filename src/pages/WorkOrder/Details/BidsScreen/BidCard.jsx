import { Button } from 'react-bootstrap';
import React from 'react';

const BidCard = ({ item, ...rest }) => {
  const {
    bid_item_number = '',
    item_description = '',
    number_of_units = 0,
    total_price = 0,
    unit_of_measure = '',
    usd_unit_price = 0
  } = item || {};

  return (
    <React.Fragment>
      <div className="text-light d-flex bg-info border-border-primary flex-column p-1">
        <div>{item_description}</div>
        <div className="d-flex flex-row justify-content-center">
          <div className="flex-grow-1 d-flex align-items-center">{`$${total_price}=${number_of_units} ${unit_of_measure} @ $${usd_unit_price} per ${unit_of_measure}`}</div>
          <Button variant="outline-danger" size="sm">
            Cancel Bid
          </Button>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default BidCard;
