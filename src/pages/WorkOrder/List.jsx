import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, InputGroup } from 'react-bootstrap';

import { get as getWorkOrders } from '@redux/workOrders/actions';
import { ContentLoader } from 'components';
import { ListCard } from './components';

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

  render() {
    const { data: workOrders = [] } = this.props.workOrders;
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
            {this.props.workOrders.isLoading ? (
              <ContentLoader>Loading Work Order List</ContentLoader>
            ) : (
              filteredData.map((item, index) => <ListCard key={index} item={item} />)
            )}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ workOrders: state.workOrders });

export default connect(mapStateToProps, { getWorkOrders })(WorkOrderList);
