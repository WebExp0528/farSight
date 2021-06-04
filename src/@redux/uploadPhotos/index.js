import { createFlushReducer, composeReducers, createGetWithPaginationReducer } from '../@reducers';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const NAME = genActionTypes(ACTION_NAME).NAME;

// reducers
const getReducer = (state, action) => {
  switch (action.type) {
    case `${genActionTypes(ACTION_NAME).CREATE}_START`: {
      const oldData = state.data[action.payload.id] || {};
      return {
        ...state,
        [action.payload.id]: {
          ...oldData,
          isConverting: true
        }
      };
    }

    case `${genActionTypes(ACTION_NAME).CREATE}_SUCCESS`: {
      const oldData = state.data[action.payload.id] || {};
      return {
        ...state,
        [action.payload.id]: {
          ...oldData,
          photos: [...oldData.photos, ...action.payload.photos],
          isConverting: false
        }
      };
    }

    case `${genActionTypes(ACTION_NAME).CREATE}_ERROR`: {
      const oldData = state.data[action.payload.id] || {};
      return {
        ...state,
        [action.payload.id]: {
          ...oldData,
          isConverting: false
        }
      };
    }

    default:
      return state;
  }
};

const flushReducer = createFlushReducer(NAME, []);

export const workOrderBidsReducer = composeReducers(initialState)(getReducer, flushReducer);

export default workOrderBidsReducer;
