import enhaceLocalStorage from '../enhanceReducerWithWriteLocalStorage';
import { createFlushReducer, composeReducers, createGetReducer } from '../@reducers';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const name = genActionTypes(ACTION_NAME).NAME;

// reducers
const getReducer = createGetReducer(name, initialState);
const flushReducer = createFlushReducer(name, []);

export const workOrderDetailReducer = composeReducers(initialState)(getReducer, flushReducer);

export default enhaceLocalStorage(name)(workOrderDetailReducer);
