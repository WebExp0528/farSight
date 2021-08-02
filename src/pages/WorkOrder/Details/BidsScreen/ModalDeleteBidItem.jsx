import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { useRedux } from '@redux';
import { cancel as deleteBid } from '@redux/workOrderBids/actions';
import ButtonLoading from 'components/ButtonLoading';

import { getWonID } from './../helper';

const ModalDeleteBidItem = props => {
  const { isOpen, handleClose, item, onRefresh } = props;
  const wonId = getWonID(props);

  const workOrderBidsState = useRedux('workOrderBids');
  const d = useDispatch();

  const handleClickDelete = async () => {
    await d(deleteBid(wonId, { ...item }));
    onRefresh();
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the following bid item?
        <br />
        <b>
          {item.bid_item_number} : {item.item_description}
        </b>
        <hr />
        <ButtonLoading
          isLoading={workOrderBidsState.isDeleting}
          variant="success"
          type="submit"
          onClick={handleClickDelete}
        >
          Confirm
        </ButtonLoading>
      </Modal.Body>
    </Modal>
  );
};

export default withRouter(ModalDeleteBidItem);
