import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import ButtonLoading from 'components/ButtonLoading';
import BaseWorkOrder from './_base';

const Survey = {
  meta: {
    surveyTemplateId: 'FarSightMinimal',
    version: 3.1,
    name: 'NS Work Survey FarSight Minimal'
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

class BasicSurvey extends BaseWorkOrder {
  toastMessage = null;

  componentDidMount() {
    this.setupSurvey(Survey); //Ensures that the survey has all required questions represented.
    this.dispatch = this.props.dispatch;
  }
  render() {
    return (
      <Form onSubmit={this.submitSurvey}>
        <Form.Group>
          <Form.Label>Was Work Completed?</Form.Label>
          <Form.Control as="select" id="Work_Completed__c" onChange={this.updateAnswer}>
            <option>Yes</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Date Serviced:</Form.Label>
          <Form.Control
            type="date"
            value={this.getAnswerFromState('Date_Serviced__c') || ''}
            id="Date_Serviced__c"
            min="1900-01-01"
            max={new Date().toISOString().slice(0, 10)}
            onChange={this.updateAnswer}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes to Staff:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="Vendor_Notes_To_Staff__c"
            onChange={this.updateAnswer}
            value={this.getAnswerFromState('Vendor_Notes_To_Staff__c') || ''}
          ></Form.Control>
        </Form.Group>
        <ButtonLoading isLoading={this.state.isLoading} variant="primary" type="submit">
          Submit
        </ButtonLoading>
      </Form>
    );
  }
}

export default connect(null)(BasicSurvey);
