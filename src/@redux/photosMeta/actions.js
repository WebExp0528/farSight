import { genActionTypes } from 'helpers';

const ACTION_NAME = 'photos_meta';
export const ACTION_TYPES = genActionTypes(ACTION_NAME);

export const setTotalSavedPhotos = (wonId, total) => () => {
  return {
    type: ACTION_TYPES.GET,
    payload: {
      wonId,
      total
    }
  };
};

export const removePhotoMeta = wonId => () => {
  return {
    type: ACTION_TYPES.DELETE,
    payload: {
      wonId
    }
  };
};

export const uploadingPhotos = (wonId, result) => () => {
  return {
    type: ACTION_TYPES.UPDATE,
    payload: {
      wonId,
      result
    }
  };
};
