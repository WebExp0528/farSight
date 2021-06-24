import { genActionTypes, readFileAsBase64, readFileAsArrayBuffer, base64ToBlob } from 'helpers';
import ImageResizer, { imageResizeConfig } from 'helpers/ImageResizer';
import CryptoJS from 'crypto-js';

export const ACTION_NAME = 'upload_photos';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Upload Photo
 * @param {string | number} id
 * @returns
 */
export const set =
  (id, files, category) =>
  ({ _axios }) => {
    return {
      type: ACTION_TYPES.CREATE,
      meta: {
        id,
        total: files.length
      },
      payload: async () => {
        let resizedPhotos = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const imageResizer = new ImageResizer();
          const resizedPhoto = await imageResizer.readAndCompressImage(file, imageResizeConfig);
          // read resized image file
          const imageData = await readFileAsArrayBuffer(resizedPhoto);
          const base64Photo = await readFileAsBase64(resizedPhoto);

          // read resized image file

          const filename = file.name;

          let checksum = CryptoJS.MD5(imageData).toString();
          let fileId = checksum.toString();

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
            file: base64Photo.result
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
  (id, photo = {}) =>
  ({ axios }) => {
    // Making Form Data
    let formData = new FormData();
    formData.append(
      'payload',
      JSON.stringify({
        evidenceType: photo.evidenceType,
        fileExt: photo.fileExt,
        fileName: photo.fileName,
        fileType: photo.fileType,
        timestamp: photo.timestamp,
        gpsAccuracy: photo.gpsAccuracy,
        gpsLatitude: photo.gpsLatitude,
        gpsLongitude: photo.gpsLongitude,
        gpsTimestamp: photo.gpsTimestamp,
        parentUuid: photo.parentUuid,
        uuid: photo.uuid,
        imageLabel: photo.imageLabel
      })
    );
    formData.append('file', base64ToBlob(photo.file), photo.fileName);

    return {
      type: ACTION_TYPES.UPDATE,
      meta: id,
      payload: axios
        .post(`/api/work_order/${id}/photo`, formData)
        .then(_res => {
          return photo;
        })
        .catch(_err => {
          /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
          console.error(_err);
          return photo;
        })
    };
  };
