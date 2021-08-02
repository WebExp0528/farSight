const ACTION_NAME = 'photos_meta';

export const ACTION_TYPES = {
  RESIZE_START: `@${ACTION_NAME}/RESIZE_START`,
  RESIZE_END: `@${ACTION_NAME}/RESIZE_END`,
  RESIZED: `@${ACTION_NAME}/RESIZED`,
  DELETE: `@${ACTION_NAME}/DELETE`,
  UPLOADED: `@${ACTION_NAME}/UPLOADED`,
  NAME: `@${ACTION_NAME}`
};

export const resizedPhoto = wonId => {
  return {
    type: ACTION_TYPES.RESIZED,
    payload: {
      wonId
    }
  };
};

export const startResize = wonId => ({
  type: ACTION_TYPES.RESIZE_START,
  payload: {
    wonId
  }
});

export const endResize = wonId => ({
  type: ACTION_TYPES.RESIZE_END,
  payload: {
    wonId
  }
});

export const removePhotoMeta = wonId => () => {
  return {
    type: ACTION_TYPES.DELETE,
    payload: {
      wonId
    }
  };
};

export const uploadedPhotos = (wonId, result) => () => {
  return {
    type: ACTION_TYPES.UPLOADED,
    payload: {
      wonId,
      result
    }
  };
};
