import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalUpdateStatus = ({ isOpen, handleClose }) => {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="completionDate">
            <Form.Label>Expected Completion Date</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Send Status Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalUpdateStatus;
