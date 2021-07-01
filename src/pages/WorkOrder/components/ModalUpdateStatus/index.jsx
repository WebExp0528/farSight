import React from 'react';
import { connect } from 'react-redux';
import { Modal, Badge } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import moment from 'moment';

import { updateStatus, get as getWorkOrderDetails } from '@redux/workOrderDetail/actions';
import { FormControlFormik, ButtonLoading, DateTimeFormik } from 'components';
import { validationSchema } from './validationSchema';
import { useRedux } from '@redux';
import { getItemStatus, getItemStatusBadgeClass } from '../helper';

import cls from './modal-update-status.module.scss';

const ModalUpdateStatus = ({ isOpen, handleClose, won, updateStatusAction, getWorkOrderDetailsAction }) => {
  const wordOrderDetailState = useRedux('workOrderDetail');

  const initialValues = {
    expected_completion_date: moment(),
    notes: ''
  };

  const handleSubmit = async data => {
    await updateStatusAction(won.won, {
      expected_upload_date: data.expected_completion_date.format('YYYY-MM-DD'),
      explanation: data.notes,
      delay_reason: 'Not Delayed',
      order_status: 'On Time'
    });

    await getWorkOrderDetailsAction(won.won);

    handleClose();
  };

  const handleValidDate = current => {
    const min = moment().startOf('day');
    return current.isSame(min) || current.isAfter(min);
  };

  const renderForm = formikProps => {
    const handleChange = name => value => {
      if (name === 'expected_completion_date') {
        const min = moment();
        if (!(value.isSame(min) || value.isAfter(min))) {
          return;
        }
      }
      const newValues = _.set(formikProps.values, name, value);
      formikProps.setValues(newValues);
      formikProps.setTouched(_.set(formikProps.touched, name, true));
    };

    return (
      <FormikForm>
        <Modal.Header className={cls.modalHeader} closeButton>
          <Modal.Title>
            Update Status
            <Badge bg={getItemStatusBadgeClass(won)}>{getItemStatus(won)}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cls.modalBody}>
          <DateTimeFormik
            label="Expected Completion Date"
            name="expected_completion_date"
            onChange={handleChange('expected_completion_date')}
            isValidDate={handleValidDate}
            closeOnSelect
          />
          <FormControlFormik label="Notes" name="notes" as="textarea" rows={3} />
        </Modal.Body>
        <Modal.Footer className={cls.modalFooter}>
          <ButtonLoading isLoading={wordOrderDetailState.isUpdating} variant="success" size="lg" type="submit">
            Send Status Update
          </ButtonLoading>
        </Modal.Footer>
      </FormikForm>
    );
  };

  return (
    <Modal show={isOpen} onHide={handleClose} dialogClassName={cls.modalWrapper}>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={initialValues}>
        {renderForm}
      </Formik>
    </Modal>
  );
};

export default connect(null, { updateStatusAction: updateStatus, getWorkOrderDetailsAction: getWorkOrderDetails })(
  ModalUpdateStatus
);
