import { createGetWithPaginationReducer, createFlushReducer, composeReducers } from '../@reducers';
import initialState from './initialState';

const NAME = '@work_orders';

// reducers
const getReducer = createGetWithPaginationReducer(NAME, initialState);
// const createReducer = createCreateInArrayReducer(NAME, initialState);
// const updateReducer = createUpdateInArrayReducer(NAME, initialState);
// const deleteReducer = createDeleteInArrayReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, []);

export const formsPagesReducer = composeReducers(initialState)(getReducer, flushReducer);

export default formsPagesReducer;
