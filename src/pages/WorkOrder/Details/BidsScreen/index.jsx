import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { ContentLoader } from 'component';
import { useRedux, useReduxLoading } from '@redux';
import { get as getWorkOrderBids } from '@redux/workOrderBids/actions';
import { getWonID } from '../helper';

export const BidsScreen = props => {
  const wonId = getWonID(props);

  const d = useDispatch();

  React.useEffect(() => {
    console.log('~~~~~~~ loading bids', wonId);
    d(getWorkOrderBids(wonId));
  }, [wonId]);

  const workOrderBidsState = useRedux('workOrderBids');

  if (useReduxLoading('workOrderBids')) {
    return <ContentLoader>Loading Bid Items...</ContentLoader>;
  }

  console.log('~~~~~ workOer', workOrderBidsState);
  const totalPrice = '50';
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col xs={6}>
                  <h5>Bid Items</h5>
                </Col>
                <Col xs={6}>
                  <h5>{`Total = $${totalPrice}`}</h5>
                </Col>
              </Row>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            {/* <Table striped bordered hover>
              <thead>
                <tr style={{ fontSize: '0.75em' }}>
                  <th>#</th>
                  <th>Description</th>
                  <th>Qty &amp; Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map(bid_item => (
                  <>
                    <tr>
                      <td style={{ fontSize: '0.75em' }}>{bid_item.bid_item_number}</td>
                      <td>{bid_item.item_description}</td>
                      <td>
                        {bid_item.number_of_units}@&nbsp;$
                        {bid_item.usd_unit_price}&nbsp;
                        <span style={{ fontSize: '0.75em' }}>per</span>&nbsp;
                        {bid_item.unit_of_measure}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Badge variant="success">{bid_item.status}</Badge>
                      </td>
                      <td>Total:&nbsp;${bid_item.total_price}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table> */}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BidsScreen;
