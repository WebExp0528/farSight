import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

import { cancel as deleteBid } from '@redux/workOrderBids/actions';
import { ContentLoader, FormControlFormik } from 'components';
import { get as getWorkOrderBids } from '@redux/workOrderBids/actions';
import { getWonID } from './../helper';
import { withRouter } from 'react-router';

/**
 * TODO: Add Validation Schema
 */
const validationSchema = Yup.object().shape({}, []);

const ModalDeleteBidItem = props => {
  const { isOpen, handleClose, item } = props;
  const wonId = getWonID(props);

  const d = useDispatch();

  const handleSubmit = async formData => {
    await d(
      deleteBid(wonId, {
        ...item
      })
    );
    d(getWorkOrderBids(wonId));
    handleClose();
  };

  const renderForm = formikProps => {
    if (formikProps.isSubmitting) {
      return <ContentLoader>Deleting...</ContentLoader>;
    }

    return (
      <FormikForm>
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
          <Button variant="success" type="submit" onClick={formikProps.handleSubmit}>
            Confirm
          </Button>
        </Modal.Body>
      </FormikForm>
    );
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={{}}>
        {renderForm}
      </Formik>
    </Modal>
  );
};

export default withRouter(ModalDeleteBidItem);
