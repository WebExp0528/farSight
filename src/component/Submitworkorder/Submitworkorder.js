import React, { Component } from 'react';
import { Badge, Button, Card, Container, Form, Image, InputGroup, Row, Spinner, Navbar, Toast } from 'react-bootstrap';
import BasicSurvey from './BasicSurvey';
import PoolSurvey from './PoolSurvey';
import FinalCheckSurvey from './FinalCheck';
class Submitworkorder extends Component {
  toastMessage = null;
  toggleShowToast = () => {
    this.setState((state, props) => {
      return { showToast: !state.showToast };
    });
  };
  setShowToast = val => {
    this.setState((state, props) => {
      return { showToast: val };
    });
  };
  state = {
    showToast: false,
    survey: { answers: [] }
  };
  getAnswerFromState = id => {
    let question = this.state.survey.answers.find(a => {
      return a && a.id === id;
    });
    if (question) {
      return question.answer;
    } else {
      return null;
    }
  };
  setupSurvey = surveyTemplate => {
    this.setState({ survey: surveyTemplate });
  };
  updateAnswer = event => {
    this.state.survey.answers.find(a => {
      return a.id === event.target.id;
    }).answer = event.target.value;
    this.forceUpdate();
  };
  submitSurvey = async event => {
    event.preventDefault();
    console.log(this.props.won);
    console.log(this.state);
    fetch('/api/work_order/' + this.props.won + '/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.ERRORS && data.ERRORS.length > 0) {
          this.toastMessage = JSON.stringify(data.ERRORS);
        }
        this.toastMessage = 'Submission Recieved.  Thank You.';
        this.setShowToast(true);
        window.location.href = '/';
      })
      .catch(err => {
        console.error(err);
        this.toastMessage = JSON.stringify(err);
        this.setShowToast(true);
      });
  };
  renderSurvey = () => {
    const surveyName = this.props.surveyName;
    let survey = {};
    switch (surveyName) {
      case 'NS_FSAPI_Pool_Beta-v1':
        survey = <PoolSurvey parent={this} />;
        break;
      case 'FinalCheck':
        survey = <FinalCheckSurvey parent={this} />;
        break;
      case 'FarSightBasic':
      default:
        survey = <BasicSurvey parent={this} />;
        break;
    }
    return survey;
  };
  render() {
    return (
      <Container>
        <Toast onClose={this.toggleShowToast} show={this.state.showToast} animation={true}>
          <Toast.Header>OOPS!</Toast.Header>
          <Toast.Body>{this.toastMessage}</Toast.Body>
        </Toast>
        {this.renderSurvey()}
      </Container>
    );
  }
}
export default Submitworkorder;
