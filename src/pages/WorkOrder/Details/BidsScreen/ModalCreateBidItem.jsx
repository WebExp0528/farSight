import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

import { useRedux } from '@redux';
import { create as createBid } from '@redux/workOrderBids/actions';
import { ButtonLoading, FormControlFormik, InputUSDFormik } from 'components';

import { getWonID } from './../helper';
import { withRouter } from 'react-router';

/**
 * TODO: Add Validation Schema
 */
const validationSchema = Yup.object().shape(
  {
    item_description: Yup.string().required('Please input item description'),
    usd_unit_price: Yup.number().min(1, 'Must be greater than 0'),
    number_of_units: Yup.number().min(1, 'Must be greater than 0')
  },
  []
);

const ModalCreateBitItem = props => {
  const { isOpen, handleClose, onRefresh } = props;
  const wonId = getWonID(props);
  const workOrderBidsState = useRedux('workOrderBids');
  const d = useDispatch();

  const initialValues = {
    bid_item_number: 'new',
    item_description: '',
    usd_unit_price: 1,
    number_of_units: 1,
    unit_of_measure: 'EA',
    status: ''
  };

  const handleSubmit = async data => {
    await d(createBid(wonId, { ...data }));
    onRefresh();
    handleClose();
  };

  const renderForm = formikProps => {
    return (
      <FormikForm>
        <Modal.Header closeButton>
          <Modal.Title>Add Bid Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControlFormik
            name="item_description"
            placeholder="Enter description of the work or item..."
            label="Item Description"
          />
          <FormControlFormik label="Quantity" type="number" name="number_of_units" />
          <FormControlFormik label="Unit of Measure" as="select" name="unit_of_measure">
            <option>EA</option>
            <option>CY</option>
            <option>SQFT</option>
            <option>SY</option>
            <option>LF</option>
            <option>CF</option>
            <option>SQ</option>
            <option>GAL</option>
          </FormControlFormik>
          <InputUSDFormik label="Price Per Unit" type="number" name="usd_unit_price" />
          <ButtonLoading
            variant="primary"
            type="submit"
            onClick={formikProps.handleSubmit}
            isLoading={workOrderBidsState.isCreating}
          >
            Submit
          </ButtonLoading>
        </Modal.Body>
      </FormikForm>
    );
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={initialValues}>
        {renderForm}
      </Formik>
    </Modal>
  );
};

export default withRouter(ModalCreateBitItem);
