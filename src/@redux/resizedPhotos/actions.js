export const ACTION_NAME = '@resized_photos';

/**
 * Save resized photos count
 *
 * @param {boolean} status
 */
export const resizedPhoto = (wonId, status) => {
  if (status) {
    return {
      type: `${ACTION_NAME}/SUCCESS`,
      payload: {
        wonId
      }
    };
  } else {
    return {
      type: `${ACTION_NAME}/FAILED`,
      payload: {
        wonId
      }
    };
  }
};
