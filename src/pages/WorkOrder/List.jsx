import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { debounce, throttle } from 'lodash';

import { get as getWorkOrders } from '@redux/workOrders/actions';
import { ContentLoader } from 'components';
import { ListCard } from './components';
import { useRedux } from '@redux';

export const WorkOrderList = ({ workOrdersState, getWorkOrders }) => {
  const { data: workOrders = [] } = workOrdersState;

  const userState = useRedux('user');
  const [filter, setFilter] = React.useState('');
  const [filteredWorkOrders, setFilteredWorkOrders] = React.useState([]);

  React.useEffect(() => {
    getWorkOrders();
  }, []);

  React.useEffect(() => {
    if (
      !workOrdersState.isLoading ||
      !workOrdersState.isUpdating ||
      !workOrdersState.isDeleting ||
      !workOrdersState.isCreating
    ) {
      filterWorkOrders(filter);
    }
  }, [workOrders, filter]);

  const filterWorkOrders = React.useCallback(keyword => {
    const tmpFiltered = workOrders.filter(item => {
      if (!keyword) {
        return true;
      }
      return Object.keys(item).some(
        key => typeof item[key] === 'string' && item[key].toLowerCase().indexOf(keyword) >= 0
      );
    });
    setFilteredWorkOrders(tmpFiltered);
  }, []);

  const handleChangeFilter = debounce(
    event => {
      setFilter(event.target.value);
      filterWorkOrders((event?.target?.value || '').toLowerCase());
    },
    250,
    { leading: false, maxWait: 3000, trailing: true }
  );

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
                  fontSize: '12px',
                  color: 'grey',
                  textAlign: 'center'
                }}
              >
                <p style={{ marginBottom: '3px' }}>
                  Hello&nbsp;
                  <span className="link-primary">{userState?.name || ''}</span>, You&nbsp;are&nbsp;viewing&nbsp;
                  <span className="link-primary">
                    {filteredWorkOrders.length}&nbsp;of&nbsp;{(workOrdersState.data || []).length}
                  </span>
                  &nbsp;open&nbsp;work&nbsp;orders.
                </p>
                <p style={{ marginBottom: '3px' }}>Select a work order to get started</p>
              </div>
              {filteredWorkOrders.map((item, index) => (
                <ListCard key={`${item.wonId}_${index}`} item={item} />
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
