import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import DateTime from 'react-datetime';
import _ from 'lodash';

import { InputText, withFormikField } from 'component';

import { validationSchema } from './validationSchema';

import cls from './modal-update-status.module.scss';

const DateTimeFormik = withFormikField('')(DateTime);

const ModalUpdateStatus = ({ isOpen, handleClose }) => {
  const initialValues = {
    expected_completion_date: '',
    notes: ''
  };

  const handleSubmit = data => {
    console.log('````` submitting ', data);
  };

  const renderForm = formikProps => {
    const handleChange = name => value => {
      const newValues = _.set(formikProps.values, name, value);
      formikProps.setValues(newValues);
      formikProps.setTouched(_.set(formikProps.touched, name, true));
    };

    return (
      <FormikForm>
        <Modal.Header className={cls.modalHeader} closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cls.modalBody}>
          <Form.Group controlId="completionDate">
            <DateTimeFormik
              label="Expected Completion Date"
              name="expected_completion_date"
              onChange={handleChange('expected_completion_date')}
            />
          </Form.Group>
          <Form.Group controlId="notes">
            <InputText label="Notes" name="notes" as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={cls.modalFooter}>
          <Button variant="success" size="lg" type="submit">
            Send Status Update
          </Button>
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

export default ModalUpdateStatus;
