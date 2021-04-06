import React, { Component } from 'react';
import { Badge, Button, Card, Container, Form, Image, InputGroup, Row, Spinner, Navbar, Toast } from 'react-bootstrap';
class BasicSurvey extends Component {
  toastMessage = null;

  survey = {
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
  componentDidMount() {
    const parent = this.props.parent;
    //Doing this means that we cannot render
    parent.setupSurvey(this.survey); //Ensures that the survey has all required questions represented.
  }
  render() {
    const parent = this.props.parent;
    return (
      <Form onSubmit={parent.submitSurvey} id="SurveyForm">
        <Form.Group controlId="Work_Completed__c">
          <Form.Label>Was Work Completed?</Form.Label>
          <Form.Control as="select" id="Work_Completed__c" onChange={parent.updateAnswer}>
            <option>Yes</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="Date_Serviced__c">
          <Form.Label>Date Serviced:</Form.Label>
          <Form.Control
            type="date"
            value={parent.getAnswerFromState('Date_Serviced__c')}
            id="Date_Serviced__c"
            min="1900-01-01"
            max={new Date().toISOString().slice(0, 10)}
            onChange={parent.updateAnswer}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Vendor_Notes_To_Staff__c">
          <Form.Label>Notes to Staff:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="Vendor_Notes_To_Staff__c"
            onChange={parent.updateAnswer}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default BasicSurvey;
