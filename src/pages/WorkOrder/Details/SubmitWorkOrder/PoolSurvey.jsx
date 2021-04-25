import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import BaseWorkOrder from './_base';

const Survey = {
  meta: {
    surveyTemplateId: 'NS_FSAPI_Pool_Beta-v1',
    version: 3.1,
    name: 'NS Work Survey Pool Maintenance'
  },
  answers: [
    {
      id: 'Work_Completed__c',
      answer: 'Yes'
    },
    {
      id: 'Vendor_Notes_To_Staff__c',
      answer: ''
    },
    {
      id: 'Date_Serviced__c',
      answer: new Date().toISOString().slice(0, 10)
    }
  ]
};

class PoolSurvey extends BaseWorkOrder {
  toastMessage = null;

  componentDidMount() {
    this.dispatch = this.props.dispatch;
    this.setupSurvey(Survey);
  }

  render() {
    return (
      <Form onSubmit={this.submitSurvey}>
        <Form.Group>
          <Form.Label>Are you able to complete this work order?</Form.Label>
          <Form.Control as="select" id="Work_Completed__c" onChange={this.updateAnswer}>
            <option>Yes</option>
            <option>Trip Charge</option>
          </Form.Control>
        </Form.Group>
        <Form.Group hidden={this.getAnswerFromState('Work_Completed__c') === 'Yes'}>
          <Form.Label>Reason for Trip Charge :</Form.Label>
          <Form.Control as="select" id="Trip_Charge_Reason__c" onChange={this.updateAnswer}>
            <option>Bad Address</option>
            <option>Gated Community</option>
            <option>HOA Maintained</option>
            <option>No Access</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Date Serviced:</Form.Label>
          <Form.Control
            type="date"
            value={this.getAnswerFromState('Date_Serviced__c')}
            id="Date_Serviced__c"
            min="1900-01-01"
            max={new Date().toISOString().slice(0, 10)}
            onChange={this.updateAnswer}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            What day of the week are you completing the weekly pool service for this property?(DOES NOT EXIST)
          </Form.Label>
          <Form.Control as="select" id="Weekly_Service_Day__c" onChange={this.updateAnswer}>
            <option>None</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes to Staff:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="Vendor_Notes_To_Staff__c"
            onChange={this.updateAnswer}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <br />
        <br />
        <br />
      </Form>
    );
  }
}

export default connect(null)(PoolSurvey);
