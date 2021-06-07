import { genActionTypes, readFileAsBase64 } from 'helpers';
import { v4 as uuidv4 } from 'uuid';
import ImageResizer, { imageResizeConfig } from 'helpers/ImageResizer';

export const ACTION_NAME = 'upload_photos';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Upload Photo
 * @param {string | number} id
 * @returns
 */
export const set =
  (id, files, category) =>
  ({ axios }) => {
    return {
      type: ACTION_TYPES.CREATE,
      meta: id,
      payload: async () => {
        let resizedPhotos = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const imageResizer = new ImageResizer();
          const resizedPhoto = await imageResizer.readAndCompressImage(file, imageResizeConfig);
          const base64Photo = await readFileAsBase64(resizedPhoto);

          const filename = file.name;
          let fileId = uuidv4();

          let data = {
            evidenceType: 'photo',
            fileExt: 'jpg',
            fileName: filename,
            fileType: 'picture',
            timestamp: null,
            gpsAccuracy: null,
            gpsLatitude: null,
            gpsLongitude: null,
            gpsTimestamp: null,
            parentUuid: '',
            uuid: fileId,
            imageLabel: category,
            file: base64Photo
          };

          resizedPhotos.push({ ...data });
        }
        return resizedPhotos;
      }
    };
  };

/**
 * Upload Photo
 *
 * @param {string | number} id
 * @returns
 */
export const uploadPhoto =
  (id, file) =>
  ({ axios }) => {
    return {
      type: ACTION_TYPES.CREATE,
      offline: {
        effect: {
          method: 'POST',
          url: `/api/work_order/${id}/photo`,
          data: file
        },
        commit: { type: 'PHOTO_UPLOAD_SUCCESS', file },
        rollback: { type: 'PHOTO_UPLOAD_FAILED', file }
      }
    };
  };
