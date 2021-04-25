import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add as addToast } from '@redux/toast/actions';

class BaseWorkOrder extends Component {
  dispatch = null;
  state = {
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
        let toastMSG = '';
        if (data.ERRORS && data.ERRORS.length > 0) {
          toastMSG = JSON.stringify(data.ERRORS);
        } else {
          toastMSG = 'Submission Recieved.  Thank You.';
        }
        this.dispatch(addToast({ type: 'success', content: toastMSG }));
        window.location.href = '/';
      })
      .catch(err => {
        console.error(err);
        const toastMessage = JSON.stringify(err);
        this.dispatch(addToast({ type: 'error', content: toastMessage }));
      });
  };

  render() {
    return <></>;
  }
}

export default BaseWorkOrder;
