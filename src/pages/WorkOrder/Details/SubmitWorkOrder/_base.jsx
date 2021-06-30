import React, { Component } from 'react';
import { Add as addToast } from '@redux/toast/actions';
import { axios } from 'helpers';

class BaseWorkOrder extends Component {
  dispatch = null;
  state = {
    survey: { answers: [] },
    isLoading: false
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
    if (!this?.props?.won?.won) {
      addToast({ content: 'Could not find work order id!', type: 'error' });
      return;
    }
    this.setState({
      isLoading: true
    });
    axios(`/api/work_order/${this.props.won.won}/survey`, {
      method: 'POST',
      data: this.state
    })
      .then(data => {
        let toastMSG = '';
        //@ts-ignore
        if (data.ERRORS && data.ERRORS.length > 0) {
          //@ts-ignore
          toastMSG = JSON.stringify(data.ERRORS);
        } else {
          toastMSG = 'Submission Recieved.  Thank You.';
        }
        this.dispatch(addToast({ type: 'success', content: toastMSG }));
        this.setState({
          isLoading: false
        });

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      })
      .catch(err => {
        const toastMessage = JSON.stringify(err);
        this.dispatch(addToast({ type: 'error', content: toastMessage }));
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    return <></>;
  }
}

export default BaseWorkOrder;
