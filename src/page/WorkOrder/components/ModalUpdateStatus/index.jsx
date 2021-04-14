import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import cls from './modal-update-status.module.scss';

const ModalUpdateStatus = ({ isOpen, handleClose }) => {
  return (
    <Modal show={isOpen} onHide={handleClose} dialogClassName={cls.modalWrapper}>
      <Form>
        <Modal.Header className={cls.modalHeader} closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cls.modalBody}>
          <Form.Group controlId="completionDate">
            <Form.Label>Expected Completion Date</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={cls.modalFooter}>
          <Button variant="primary" onClick={handleClose}>
            Send Status Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalUpdateStatus;
