import { useRedux } from '@redux';
import React from 'react';

import { Card, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';

export const Instructions = ({ match }) => {
  const { data: won } = useRedux('workOrderDetail');
  return (
    <div>
      <Card style={{ marginBottom: '0.5em' }}>
        <Card.Header style={{ padding: '0.25em' }}>INSTRUCTIONS</Card.Header>
        <Card.Body style={{ padding: '0.25em' }}>
          {won.instructions_full &&
            won.instructions_full.map((i, index) => (
              <React.Fragment key={index}>
                <h5>{`${i.action}-${i.type}`}</h5>
                <Card.Text style={{ padding: '0.25em' }}>{i.instruction}</Card.Text>
                <br />
              </React.Fragment>
            ))}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <b>Last Status Update</b>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {won.last_status_update ? (
            <>
              <Row>
                <Col>
                  <b>Status</b>
                </Col>
                <Col>{won.last_status_update.order_status}</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <b>Delay Reason</b>
                </Col>
                <Col>{won.last_status_update.delay_reason}</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <b>Expected Completion Date</b>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  {won.last_status_update.expected_completion_date
                    ? won.last_status_update.expected_completion_date
                    : won.due_date}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <b>Explanation</b>
                </Col>
              </Row>
              <Row>
                <Col>{won.last_status_update.explanation}</Col>
              </Row>
            </>
          ) : (
            <h6>This work order has not been updated.</h6>
          )}
        </Card.Body>
      </Card>
      <br />
      <br />
      <br />
    </div>
  );
};

export default withRouter(Instructions);
