import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Container } from 'react-bootstrap';

class NewLinkSent extends Component {
  isLoading = true;
  isLoggedIn = false;
  state = {
    error: {},
    isOpen: false,
    ispageStatus: false
  };
  componentDidMount() {}

  render() {
    return (
      <div style={{ color: 'grey' }}>
        <div style={{ backgroundColor: '#e5e5e5' }}>
          <Container>
            <Card style={{ marginBottom: '0.5em' }}>
              <Card.Body style={{ padding: '0.25em' }}>
                <Card.Title>New Link Sent</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                If you are a current user, a new secure link has been sent to your email address and texted to your
                mobile phone on file.
                <br />
                Please use the link we just sent to log in automatically.
              </Card.Body>
              <Card.Footer
                style={{
                  padding: '0.5em',
                  fontSize: '0.75em',
                  textAlign: 'right'
                }}
              />
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ error: state.error });

export default connect(mapStateToProps)(NewLinkSent);
