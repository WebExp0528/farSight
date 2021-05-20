import { persistentReducer } from 'redux-pouchdb';
import { createFlushReducer, composeReducers, createGetWithPaginationReducer } from '../@reducers';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const name = genActionTypes(ACTION_NAME).NAME;

// reducers
const getReducer = createGetWithPaginationReducer(name, initialState);
const flushReducer = createFlushReducer(name, []);

export const workOrderBidsReducer = composeReducers(initialState)(getReducer, flushReducer);

export default persistentReducer(workOrderBidsReducer);
