import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Card, Image } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';

import { genRandomCode } from 'helpers';

export const getItemStatus = item => {
  let dueDate = new Date(item.due_date);
  let today = new Date();
  let statusMessage = 'Unknown';
  if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
    statusMessage = 'Pending';
    return statusMessage;
  }
  if (dueDate > today) {
    statusMessage = 'On Time';
  }
  if (dueDate === today) {
    statusMessage = 'Due Today';
  }
  if (dueDate < today) {
    statusMessage = 'Past Due';
  }
  return statusMessage;
};

export const getItemStatusBadgeClass = item => {
  let status = getItemStatus(item);
  let itemClass = 'primary';
  switch (status) {
    case 'On Time':
      itemClass = 'success';
      break;
    case 'Due Today':
      itemClass = 'warning';
      break;
    case 'Past Due':
      itemClass = 'danger';
      break;
    default:
      itemClass = 'secondary';
      break;
  }

  return itemClass;
};

const ListCard = props => {
  const { item = {}, match } = props;
  return (
    <Card key={`${item.won}-${genRandomCode()}`} style={{ marginBottom: '0.5em' }}>
      <Card.Body style={{ padding: '0.25em' }}>
        <Image
          src={item.image_url_small}
          style={{
            float: 'left',
            width: '20%',
            height: '100%',
            margin: '0.25em',
            marginRight: '2em'
          }}
          thumbnail
          roundedCircle
        />
        <Card.Title>
          <Link to={`${match.url}/${item.won}`}>{item.work_ordered}</Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {item.address_street} {item.address_city}, {item.address_state}
        </Card.Subtitle>
        <Card.Text>{item.description ? renderHTML(item.description) : null}</Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          padding: '0.5em',
          fontSize: '0.75em',
          textAlign: 'right'
        }}
      >
        <Link>
          <FontAwesomeIcon icon={['fas', 'history']} flip="horizontal" />
          &nbsp;Update Status
        </Link>
        <span style={{ color: 'grey' }}>Work&nbsp;Order&nbsp;#{item.won}</span> &nbsp;&nbsp;&nbsp;&nbsp;
        <Badge variant="primary">Due: {new Date(item.due_date).toDateString()}</Badge> &nbsp;&nbsp;&nbsp;&nbsp;
        <Badge variant={getItemStatusBadgeClass(item)}>{getItemStatus(item)}</Badge>
      </Card.Footer>
    </Card>
  );
};

ListCard.propTypes = {};

export default withRouter(ListCard);
