import { createFlushReducer, composeReducers, createGetWithPaginationReducer } from '../@reducers';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const ACTION_TYPES = genActionTypes(ACTION_NAME);

// reducers
const getReducer = (state, action) => {
  const wonId = action?.meta || '';
  switch (action.type) {
    case `${ACTION_TYPES.CREATE}_START`: {
      const oldData = (state || {})[wonId] || {};
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isConverting: true
        }
      };
    }

    case `${ACTION_TYPES.CREATE}_SUCCESS`: {
      const oldData = (state || {})[wonId] || {};
      return {
        ...state,
        [wonId]: {
          ...oldData,
          photos: [...(oldData?.photos || []), ...(action?.payload || [])],
          isConverting: false
        }
      };
    }

    case `${ACTION_TYPES.CREATE}_ERROR`: {
      const oldData = (state || {})[wonId] || {};
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isConverting: false
        }
      };
    }

    default:
      return state;
  }
};

// reducers
const uploadingReducer = (state, action) => {
  // console.log('~~~~~ action', action);
  const wonId = action?.meta || '';
  switch (action.type) {
    case `${ACTION_TYPES.UPDATE}_START`: {
      const oldData = (state || {})[wonId] || {};
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isUploading: true
        }
      };
    }

    case `${ACTION_TYPES.UPDATE}_SUCCESS`: {
      const oldData = (state || {})[wonId] || {};
      const uploadedPhotoIndex = oldData.photos.indexOf(oldData.photos.find(el => el.uuid === action.payload.uuid));
      oldData.photos.splice(uploadedPhotoIndex, 1);
      return {
        ...state,
        [wonId]: {
          ...oldData,
          photos: { ...oldData.photos },
          isUploading: false,
          success: (oldData.success || 0) + 1
        }
      };
    }

    case `${ACTION_TYPES.UPDATE}_ERROR`: {
      const oldData = (state || {})[wonId] || {};
      const uploadedPhotoIndex = oldData.photos.indexOf(oldData.photos.find(el => el.uuid === action.payload.uuid));
      oldData.photos.splice(uploadedPhotoIndex, 1);
      return {
        ...state,
        [wonId]: {
          ...oldData,
          photos: { ...oldData.photos },
          isUploading: false,
          failed: (oldData.failed || 0) + 1
        }
      };
    }

    default:
      return state;
  }
};

const flushReducer = createFlushReducer(ACTION_TYPES.NAME, []);

export const workOrderBidsReducer = composeReducers(initialState)(getReducer, uploadingReducer, flushReducer);

export default workOrderBidsReducer;
