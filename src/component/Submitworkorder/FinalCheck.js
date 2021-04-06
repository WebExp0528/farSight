import React, { Component } from 'react';
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
  ListGroup
} from 'react-bootstrap';
class FinalCheckSurvey extends Component {
  toastMessage = null;

  componentDidMount() {
    const parent = this.props.parent;
    //Doing this means that we cannot render
    parent.setupSurvey(this.survey); //Ensures that the survey has all required questions represented.
  }
  render() {
    const parent = this.props.parent;
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
