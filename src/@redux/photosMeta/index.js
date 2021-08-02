import { composeReducers, createFlushReducer } from '../@reducers';
import _ from 'lodash';
import initialState from './initialState';
import { ACTION_TYPES } from './actions';

// reducers
const getReducer = (state, action) => {
  const { wonId, result = [] } = action?.payload || {};
  const oldData = _.get(state, wonId, {});
  switch (action.type) {
    case ACTION_TYPES.RESIZED: {
      return {
        ...state,
        [wonId]: {
          ...oldData,
          total: (oldData?.total || 0) + 1
        }
      };
    }

    case ACTION_TYPES.RESIZE_START: {
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isResizing: true
        }
      };
    }

    case ACTION_TYPES.RESIZE_END: {
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isResizing: false
        }
      };
    }

    case ACTION_TYPES.DELETE: {
      delete state[wonId];
      return {
        ...state
      };
    }

    case ACTION_TYPES.UPLOADED: {
      const success = result.filter(e => e.status === 'fulfilled').length;
      const failed = result.length - success;

      return {
        ...state,
        [wonId]: {
          ...oldData,
          success: (oldData?.success || 0) + success,
          failed: (oldData?.failed || 0) + failed
        }
      };
    }

    default:
      return state;
  }
};

const flushReducer = createFlushReducer(ACTION_TYPES.NAME, {});

export const resizedPhotosReducer = composeReducers(initialState)(getReducer, flushReducer);

export default resizedPhotosReducer;
