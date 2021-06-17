import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import BaseWorkOrder from './_base';

class FinalCheckSurvey extends BaseWorkOrder {
  render() {
    return (
      <Form>
        <ListGroup>
          <ListGroup.Item>
            <Form.Check id="beforePhotoCheck"></Form.Check>Uploaded Before Photos{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check id="duringPhotoCheck"></Form.Check>Uploaded During Photos{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check id="afterPhotoCheck"></Form.Check>Uploaded After Photos{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check id="surveyCheck"></Form.Check>Completed Survey{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check id="sentBidsCheck"></Form.Check>Sent Bids{' '}
          </ListGroup.Item>
        </ListGroup>
      </Form>
    );
  }
}

export default FinalCheckSurvey;
