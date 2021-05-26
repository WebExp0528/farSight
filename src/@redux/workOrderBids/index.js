import { persistentDocumentReducer } from 'redux-pouchdb';
import { createFlushReducer, composeReducers, createGetWithPaginationReducer } from '../@reducers';
import db from './../enhanceReducerWithPouchDB';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const NAME = genActionTypes(ACTION_NAME).NAME;

// reducers
const getReducer = createGetWithPaginationReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, []);

export const workOrderBidsReducer = composeReducers(initialState)(getReducer, flushReducer);

export default persistentDocumentReducer(db, NAME)(workOrderBidsReducer);
