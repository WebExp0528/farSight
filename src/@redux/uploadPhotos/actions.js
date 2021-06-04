import { genActionTypes } from 'helpers';

import ImageResizer, { imageResizeConfig } from 'helpers/ImageResizer';

export const ACTION_NAME = 'upload_photos';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Upload Photo
 * @param {string | number} id
 * @returns
 */
export const set =
  (id, files) =>
  ({ axios }) => {
    return {
      type: ACTION_TYPES.CREATE,
      payload: async () => {
        let resizedPhotos = [];
        for (let i = 0; i < files.length; i++) {
          const imageResizer = new ImageResizer();
          const resizedPhoto = await imageResizer.readAndCompressImage(files[i], imageResizeConfig);
          resizedPhotos.push(resizedPhoto);
        }
        return { id, photos: resizedPhotos };
      }
    };
  };
