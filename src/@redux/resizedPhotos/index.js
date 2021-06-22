import { composeReducers, createGetReducer, createFlushReducer } from '../@reducers';
import _ from 'lodash';
import initialState from './initialState';
import { ACTION_TYPES } from './actions';

// reducers
const getReducer = createGetReducer(ACTION_TYPES.NAME, initialState);
const flushReducer = createFlushReducer(ACTION_TYPES.NAME, {});

export const resizedPhotosReducer = composeReducers(initialState)(getReducer, flushReducer);

export default resizedPhotosReducer;
