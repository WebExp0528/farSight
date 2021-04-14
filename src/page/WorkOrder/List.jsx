import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Badge, Card, Container, Form, Image, InputGroup } from 'react-bootstrap';

import { get as getWorkOrders } from '@redux/workOrders/actions';

import { ContentLoader } from 'component';

const getItemStatus = item => {
  let dueDate = new Date(item.due_date);
  let today = new Date();
  let statusMessage = 'Unknown';
  if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
    statusMessage = 'Pending';
    return statusMessage;
  }
  if (dueDate.getDate() > today) {
    statusMessage = 'On Time';
  }
  if (dueDate.getDate() === today) {
    statusMessage = 'Due Today';
  }
  if (dueDate < today) {
    statusMessage = 'Past Due';
  }
  return statusMessage;
};

const getItemStatusBadgeClass = item => {
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

class WorkOrderList extends Component {
  state = {
    filter: ''
  };

  componentDidMount() {
    console.log('mounted list component', this.props);
    this.props.getWorkOrders();
  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  getItemStatus = item => {
    let dueDate = new Date(item.due_date);
    let today = new Date();
    let statusMessage = 'Unknown';
    if (item.approval_status === 'Pre-Pending' || item.approval_status === 'Pending') {
      statusMessage = 'Pending';
      return statusMessage;
    }
    if (dueDate.getDate() > today) {
      statusMessage = 'On Time';
    }
    if (dueDate.getDate() === today) {
      statusMessage = 'Due Today';
    }
    if (dueDate < today) {
      statusMessage = 'Past Due';
    }
    return statusMessage;
  };

  getItemStatusBadgeClass = item => {
    let status = this.getItemStatus(item);
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

  renderCard = item => {
    return (
      <div key={item.won}>
        <Card style={{ marginBottom: '0.5em' }}>
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
              <Link to={`${this.props.match.url}/${item.won}`}>{item.work_ordered}</Link>
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
            <Badge variant={this.getItemStatusBadgeClass(item)}>{this.getItemStatus(item)}</Badge>
          </Card.Footer>
        </Card>
      </div>
    );
  };

  render() {
    const { data: workOrders } = this.props.workOrders;
    console.log(this.props.workOrders.data);
    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = workOrders.filter(item => {
      return Object.keys(item).some(
        key => typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <div>
        <Container style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={['fas', 'search']} style={{ borderRight: 0 }} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Search Work Orders..." value={filter} onChange={this.handleChange} />
          </InputGroup>
        </Container>
        <div style={{ backgroundColor: '#e5e5e5' }}>
          <Container>
            <div
              style={{
                padding: '0.5em',
                fontSize: 17,
                color: 'grey',
                textAlign: 'center'
              }}
            >
              Select a work order to get started
            </div>
            {this.isLoading ? (
              <ContentLoader>Loading Work Order List</ContentLoader>
            ) : (
              filteredData.map(this.renderCard)
            )}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ workOrders: state.workOrders });

export default connect(mapStateToProps, { getWorkOrders })(WorkOrderList);
