import { composeReducers } from '../@reducers';
import _ from 'lodash';
import initialState from './initialState';
import { ACTION_NAME } from './actions';

// reducers
const setReducer = (state, action) => {
  const { wonId } = action?.payload || {};
  const oldData = _.get(state, wonId, { success: 0, failed: 0 });
  switch (action.type) {
    case `${ACTION_NAME}/SUCCESS`: {
      return {
        ...state,
        [wonId]: {
          ...oldData,
          success: oldData.success + 1
        }
      };
    }

    case `${ACTION_NAME}/FAILED`: {
      return {
        ...state,
        [wonId]: {
          ...oldData,
          failed: oldData.failed + 1
        }
      };
    }

    default:
      return state;
  }
};

export const resizedPhotosReducer = composeReducers(initialState)(setReducer);

export default resizedPhotosReducer;
