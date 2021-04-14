import enhaceLocalStorage from '../enhanceReducerWithWriteLocalStorage';
import {
  createGetWithPaginationReducer,
  // createCreateInArrayReducer,
  createFlushReducer,
  // createUpdateInArrayReducer,
  // createDeleteInArrayReducer,
  composeReducers,
  createGetReducer
} from '../@reducers';
import initialState from './initialState';

const NAME = '@work_order_detail';

// reducers
const getReducer = createGetReducer(NAME, initialState);
// const createReducer = createCreateInArrayReducer(NAME, initialState);
// const updateReducer = createUpdateInArrayReducer(NAME, initialState);
// const deleteReducer = createDeleteInArrayReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, []);

export const workOrderDetailReducer = composeReducers(initialState)(getReducer, flushReducer);

export default enhaceLocalStorage(NAME)(workOrderDetailReducer);
