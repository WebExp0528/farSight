import React, { Component, useState } from 'react';

import {
  Alert,
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
  FormControl
} from 'react-bootstrap';
class StatusScreen extends Component {
  state = {
    won: this.props.won,
    delay_reason: 'Not Delayed',
    expected_upload_date: this.props.dueDate,
    explanation: '',
    order_status: 'On Time'
  };
  componentDidMount = () => {
    this.setState((state, props) => {
      return { won: props.won, expected_upload_date: props.dueDate };
    });
  };
  updateState = event => {
    let id = event.target.id;
    let value = event.target.value;
    this.setState((state, props) => {
      let newState = { ...state };
      newState[id] = value;
      if (id === 'order_status') {
        if (value === 'On Time') {
          newState['delay_reason'] = 'Not Delayed';
          newState['expected_upload_date'] = props.dueDate;
        } else {
          newState['delay_reason'] = '';
          newState['expected_upload_date'] = '';
        }
      }
      return newState;
    });
  };
  submitStatus = event => {
    event.preventDefault();

    fetch('/api/work_order/' + this.props.won + '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.ERRORS && data.ERRORS.length > 0) {
          alert(JSON.stringify(data.ERRORS));
          return;
        }
        window.location.reload();
      })
      .catch(err => console.error(err));
  };
  render() {
    return (
      <>
        <Container>
          <Form onSubmit={this.submitStatus}>
            <Form.Group controlId="won">
              <Form.Label>Case Number</Form.Label>
              <Form.Control disabled value={this.state.won} onChange={this.updateState}></Form.Control>
            </Form.Group>
            <Form.Group controlId="order_status">
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" value={this.state.order_status} onChange={this.updateState}>
                <option>On Time</option>
                <option>Delayed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="delay_reason">
              <Form.Label>Delay Reason</Form.Label>
              <Form.Control
                as="select"
                disabled={this.state.order_status === 'Delayed' ? false : true}
                value={this.state.delay_reason}
                onChange={this.updateState}
              >
                {this.state.order_status === 'On Time' ? (
                  <option>Not Delayed</option>
                ) : (
                  <>
                    <option>Assigned Late</option>
                    <option>Bad Address</option>
                    <option>Missing Information</option>
                    <option>Technology Problems</option>
                    <option>Vehicle Breakdown</option>
                    <option>Weather Delay</option>
                    <option>Other</option>
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="expected_upload_date">
              <Form.Label>Expected Upload Date</Form.Label>
              <Form.Control
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={this.state.expected_upload_date}
                onChange={this.updateState}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="explanation">
              <Form.Label>Explanation</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.explanation}
                onChange={this.updateState}
              ></Form.Control>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      </>
    );
  }
}
export default StatusScreen;
