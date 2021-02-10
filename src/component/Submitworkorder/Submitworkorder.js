import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
  Navbar,
  Toast,
} from "react-bootstrap";
class Submitworkorder extends Component {
  toastMessage = null;
  toggleShowToast = () => {this.setState((state, props) => {return {showToast: !state.showToast}})};
  setShowToast = (val) =>{this.setState((state, props) => {return{showToast: val}})};
  state = {
    showToast : false,
    survey: {
      meta: {
        surveyTemplateId: "FarSightMinimal",
        version: 3.1,
        name: "NS Work Survey FarSight Minimal",
      },
      answers: [
        {
          id: "Work_Completed__c",
          answer: "Yes",
        },
        {
          id: "Vendor_Notes_To_Staff__c",
          answer: "",
        },
        {
          id: "Date_Serviced__c",
          answer: new Date().toISOString().slice(0,10),
        },
      ],
    },
  };
  getAnswerFromState = (id) => {
    return this.state.survey.answers.find((a) => {
      return a.id === id;
    }).answer;
  }
  updateAnswer = (event) => {
    this.state.survey.answers.find((a) => {
      return a.id === event.target.id;
    }).answer = event.target.value;
    this.forceUpdate();
  };
  submitSurvey = async (event) => {
    event.preventDefault();
    console.log(this.props.won);
    console.log(this.state);
    fetch("/api/work_order/" + this.props.won +"/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(this.state),
    }).then((res) =>res.json())
      .then((data)=>{
        if(data.ERRORS && data.ERRORS.length>0)
        {
        this.toastMessage = JSON.stringify(data.ERRORS);  
        }
        this.toastMessage = "Submission Recieved.  Thank You.";
        this.setShowToast(true);
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
        this.toastMessage = JSON.stringify(err);
        this.setShowToast(true);  
      });
  };
  render() {
    return (
      <Container>
          <Toast onClose={this.toggleShowToast} show={this.state.showToast} animation={true}>
          <Toast.Header>
            OOPS!
          </Toast.Header>
          <Toast.Body>{this.toastMessage}</Toast.Body>
        </Toast>
        <Form onSubmit={this.submitSurvey} id="SurveyForm">
          <Form.Group controlId="Work_Completed__c">
            <Form.Label>Was Work Completed?</Form.Label>
            <Form.Control
              as="select"
              id="Work_Completed__c"
              onChange={this.updateAnswer}
            >
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="Date_Serviced__c">
            <Form.Label>Date Serviced:</Form.Label>
            <Form.Control
              type="date"
              value={this.getAnswerFromState("Date_Serviced__c")}
              id="Date_Serviced__c"
              min="1900-01-01"
              max={new Date().toISOString().slice(0,10)}
              onChange={this.updateAnswer}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Vendor_Notes_To_Staff__c">
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
        </Form>
      </Container>
    );
  }
}
export default Submitworkorder;
