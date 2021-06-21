import { createFlushReducer, composeReducers, createGetReducer } from '../@reducers';
import initialState from './initialState';

const NAME = '@work_order_detail';

// reducers
const getReducer = createGetReducer(NAME, initialState);
const updateReducer = (state, action) => {
  switch (action.type) {
    case `${NAME}/UPDATE_START`:
      return {
        ...state,
        isUpdating: true
      };

    case `${NAME}/UPDATE_ERROR`:
      return {
        ...state,
        isUpdating: false
      };
    case `${NAME}/UPDATE_SUCCESS`: {
      return {
        ...state,
        isUpdating: false
      };
    }

    default:
      return state;
  }
};

const flushReducer = createFlushReducer(NAME, {});

export const workOrderDetailReducer = composeReducers(initialState)(getReducer, updateReducer, flushReducer);

export default workOrderDetailReducer;
