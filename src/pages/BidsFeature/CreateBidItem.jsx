import React, { Component } from 'react';
import { Alert, Button, Container, Form, Toast } from 'react-bootstrap';

class CreateBidItem extends Component {
  toastMessage = null;
  toastVariant = 'warning';
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
    bidItem: {
      bid_item_number: 'new',
      item_description: '',
      usd_unit_price: '',
      number_of_units: '',
      status: ''
    }
  };
  updateAnswer = event => {
    if (!event.target) {
      console.log('ERROR NO TARGET');
      return;
    }
    let id = event.target.id;
    let val = event.target.value;
    this.setState((props, state) => {
      state.bidItem = { ...this.state.bidItem };
      state.bidItem[id] = val;
      return { bidItem: state.bidItem };
    });
    console.log(this.state);
  };
  submitItem = event => {
    this.setShowToast(false);
    event.preventDefault();
    fetch('/api/work_order/' + this.props.won + '/bid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify([this.state.bidItem])
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var result = data[0].items[0];
        if (!result.created) {
          this.toastMessage = JSON.stringify(result.errors);
          this.toastVariant = 'danger';
          this.redirectOnCloseToast = false;
          this.setShowToast(true);
          return;
        }
        this.toastVariant = 'success';
        this.toastMessage = JSON.stringify(this.state) + JSON.stringify(data); //"Submission Recieved.  Thank You.";
        //this.toastMessage = "Bid Recieved.  Thank You.";
        this.setShowToast(true);
        this.redirectOnCloseToast = true;
      })
      .catch(err => console.error(err));
  };
  render() {
    return (
      <Container>
        <Toast
          onClose={() => {
            this.setShowToast(false);
            if (this.redirectOnCloseToast) {
              window.location.href = '/';
            }
          }}
          show={this.state.showToast}
          animation={true}
        >
          <Toast.Body>
            <Alert variant={this.toastVariant}>{this.toastMessage}</Alert>
          </Toast.Body>
        </Toast>
        <Form onSubmit={this.submitItem} id="BidItemForm">
          <Form.Group>
            <Form.Label>Item Description</Form.Label>
            <Form.Control id="item_description" onChange={this.updateAnswer}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control id="number_of_units" onChange={this.updateAnswer}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Unit of Measure</Form.Label>
            <Form.Control as="select" id="unit_of_measure" onChange={this.updateAnswer}>
              <option>EA</option>
              <option>CY</option>
              <option>SQFT</option>
              <option>SY</option>
              <option>LF</option>
              <option>CF</option>
              <option>SQ</option>
              <option>GAL</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price Per Unit</Form.Label>
            <Form.Control id="usd_unit_price" onChange={this.updateAnswer}></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CreateBidItem;
