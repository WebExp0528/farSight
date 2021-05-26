import { persistentDocumentReducer } from 'redux-pouchdb';
import db from './../enhanceReducerWithPouchDB';
import { createFlushReducer, composeReducers, createGetReducer } from '../@reducers';
import initialState from './initialState';

const NAME = '@work_order_detail';

// reducers
const getReducer = createGetReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, {});

export const workOrderDetailReducer = composeReducers(initialState)(getReducer, flushReducer);

export default persistentDocumentReducer(db, NAME)(workOrderDetailReducer);
