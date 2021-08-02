import {
  createFlushReducer,
  composeReducers,
  createGetWithPaginationReducer,
  createDeleteInArrayReducer,
  createCreateInArrayReducer
} from '../@reducers';

import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const NAME = genActionTypes(ACTION_NAME).NAME;

// reducers
const getReducer = createGetWithPaginationReducer(NAME, initialState);

const createReducer = createCreateInArrayReducer(NAME, initialState);
const deleteReducer = createDeleteInArrayReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, []);

export const workOrderBidsReducer = composeReducers(initialState)(
  getReducer,
  createReducer,
  deleteReducer,
  flushReducer
);

export default workOrderBidsReducer;
