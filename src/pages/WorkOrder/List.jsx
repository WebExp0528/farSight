import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, InputGroup } from 'react-bootstrap';

import { get as getWorkOrders } from '@redux/workOrders/actions';
import { ContentLoader } from 'components';
import { ListCard } from './components';

export const WorkOrderList = ({ workOrdersState, getWorkOrders }) => {
  const [filter, setFilter] = React.useState();

  React.useEffect(() => {
    getWorkOrders();
  }, []);

  const handleChangeFilter = React.useCallback(
    event => {
      setFilter((event?.target?.value || '').toLowerCase());
    },
    [setFilter]
  );

  const { data: workOrders = [] } = workOrdersState;

  const filteredData = workOrders.filter(item => {
    if (!filter) {
      return true;
    }
    return Object.keys(item).some(key => typeof item[key] === 'string' && item[key].toLowerCase().indexOf(filter) >= 0);
  });

  return (
    <div>
      <Container style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
        <InputGroup>
          <InputGroup.Text id="search-work-order">
            <FontAwesomeIcon icon={['fas', 'search']} style={{ borderRight: 0 }} />
          </InputGroup.Text>
          <Form.Control
            aria-describedby="search-work-order"
            type="text"
            placeholder="Search Work Orders..."
            value={filter}
            onChange={handleChangeFilter}
          />
        </InputGroup>
      </Container>
      <div style={{ backgroundColor: '#e5e5e5' }}>
        <Container>
          {workOrdersState.isLoading ? (
            <ContentLoader>Loading Work Order List</ContentLoader>
          ) : (
            <React.Fragment>
              <div
                style={{
                  padding: '0.5em',
                  fontSize: 17,
                  color: 'grey',
                  textAlign: 'center'
                }}
              >
                <p>Hello John, You are viewing 126 of 400 open work orders.</p>
                <p>Select a work order to get started</p>
              </div>
              {filteredData.map((item, index) => (
                <ListCard key={index} item={item} />
              ))}
            </React.Fragment>
          )}
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ workOrdersState: state.workOrders });

export default connect(mapStateToProps, { getWorkOrders })(WorkOrderList);
