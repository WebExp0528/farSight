import { createFlushReducer, composeReducers } from '../@reducers';
import _ from 'lodash';
import initialState from './initialState';
import { ACTION_NAME } from './actions';
import { genActionTypes } from 'helpers';

const ACTION_TYPES = genActionTypes(ACTION_NAME);

// reducers
const getReducer = (state, action) => {
  const wonId = action?.meta?.id || '';
  switch (action.type) {
    case `${ACTION_TYPES.CREATE}_START`: {
      const oldData = _.get(state, wonId, {});
      return {
        ...state,
        [wonId]: {
          ...oldData,
          total: (action?.meta?.total || 0) + (oldData?.total || 0),
          isConverting: true
        }
      };
    }

    case `${ACTION_TYPES.CREATE}_SUCCESS`: {
      const oldData = _.get(state, wonId, {});
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
      const oldData = _.get(state, wonId, {});
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
  const wonId = action?.meta || '';

  switch (action.type) {
    case `${ACTION_TYPES.UPDATE}_START`: {
      const oldData = _.get(state, wonId, {});
      return {
        ...state,
        [wonId]: {
          ...oldData,
          isUploading: true
        }
      };
    }

    case `${ACTION_TYPES.UPDATE}_SUCCESS`: {
      const oldData = _.get(state, wonId, {});

      const uploadedPhotoIndex = oldData.photos.indexOf(oldData.photos.find(el => el.uuid === action.payload.uuid));
      oldData.photos.splice(uploadedPhotoIndex, 1);
      return {
        ...state,
        [wonId]: {
          ...oldData,
          photos: [...oldData.photos],
          isUploading: false,
          success: (oldData.success || 0) + 1
        }
      };
    }

    case `${ACTION_TYPES.UPDATE}_ERROR`: {
      const oldData = _.get(state, wonId, {});

      const uploadedPhotoIndex = oldData.photos.indexOf(oldData.photos.find(el => el.uuid === action.payload.uuid));
      oldData.photos.splice(uploadedPhotoIndex, 1);
      return {
        ...state,
        [wonId]: {
          ...oldData,
          photos: [...oldData.photos],
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
