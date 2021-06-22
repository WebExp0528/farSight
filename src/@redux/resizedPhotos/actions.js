import { photoStorageMetaInstance } from 'helpers/photoStorage';
import { genActionTypes } from 'helpers';

const ACTION_NAME = 'resized_photos';
export const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Sync Resized Photos Meta info with IndexedDB
 *
 */
export const syncResizedPhotosWithDB = () => () => {
  return {
    type: ACTION_TYPES.GET,
    payload: photoStorageMetaInstance.getAllMeta()
  };
};
