import CryptoJS from 'crypto-js';
import localforage from 'localforage';

import axios from './axios';
import { readFileAsArrayBuffer, readFileAsBase64 } from './readFile';
import ImageResizer, { imageResizeConfig } from './ImageResizer';
import { base64ToBlob } from './base64ToBlob';

const PHOTO_STORE_NAME = '@PhotoStore';

/**
 * @typedef {{evidenceType: string, fileExt: string, fileName: string, fileType: string, timestamp: number, gpsAccuracy: string,  gpsLatitude: number,gpsLongitude: number,gpsTimestamp: number,parentUuid: string,uuid: string,imageLabel: string, file: string}} Photo
 */

class PhotoStorage {
  /**
   * @type {import('localforage')}
   */
  _storage = null;
  _wonId = null;

  /**
   *
   * @param {string} wonId
   */
  constructor(wonId) {
    this._wonId = wonId;
    this._storage = localforage.createInstance({
      name: PHOTO_STORE_NAME,
      storeName: wonId
    });
  }

  getAllKeys = () => this._storage.keys();

  getLength = () => this._storage.length();

  /**
   * Set photos into storage
   *
   * @param {File[]} files
   * @param {string} category
   * @param {Function} callback
   * @returns
   */
  setPhotos = async (files, category, callback = () => {}) => {
    try {
      for (let i = 0; i < files.length; i++) {
        await this.savePhoto(files[i], category, callback);
      }
    } catch (error) {
      /* eslint-disable-next-line */
      console.error(`[Error in setPhotos] => err`, error);
    }
  };

  /**
   * Resize and save photo into storage
   *
   * @param {File} file
   * @param {string} category
   * @param {Function} callback
   * @returns
   */
  savePhoto = async (file, category, callback) => {
    try {
      const imageResizer = new ImageResizer();
      const resizedPhoto = await imageResizer.readAndCompressImage(file, imageResizeConfig);
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

      await this._storage.setItem(this.genId(data), data);
      callback(true);
    } catch (err) {
      /* eslint-disable-next-line */
      console.error(`[Error in savePhoto] => err`, err, file);
      callback(false);
    }
  };

  /**
   *
   * @param {Photo} data
   */
  genId = data => {
    return `${data.imageLabel}_${data.uuid}`;
  };

  dropInstance = () => this._storage.dropInstance();

  /**
   * Start Uploading
   *
   * @param {number} chunkSize Upload File Number
   * @param {(wonId:string, result)=>void} callback
   * @param {(wonId:string,status:boolean)=>void} done
   */
  startUpload = async (chunkSize = 2, callback = () => {}, done = () => {}) => {
    try {
      let total = await this._storage.length();
      while (total) {
        const photos = await this.getChunkPhotos(chunkSize);

        const result = await Promise.allSettled(Object.keys(photos).map(key => this.uploadPhoto(key, photos[key])));
        callback(this._wonId, result);
        total = await this._storage.length();
      }
      await this.dropInstance();
      done(this._wonId, true);
      return;
    } catch (error) {
      /* eslint-disable-next-line */
      console.error(`[Error in startUpload] => `, error);
      done(this._wonId, false);
      return;
    }
  };

  /**
   * Upload single photo file
   *
   * @param {string} key
   * @param {Photo} photo
   */
  uploadPhoto = async (key, photo) => {
    try {
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

      await axios.post(`/api/work_order/${this._wonId}/photo`, formData);
      await this._storage.removeItem(key);
    } catch (error) {
      /* eslint-disable-next-line */
      console.error(`[Error in photo upload] => `, error);
      throw error;
    } finally {
      //can we check if this exists first?
      this._storage
        .removeItem(key)
        .then(function () {
          // Run this code once the key has been removed.
          /* eslint-disable-next-line */
          console.log('removed key from local storage : ', key);
        })
        .catch(function (err) {
          // This code runs if there were any errors
          /* eslint-disable-next-line */
          console.error(err);
        });
    }
  };

  /**
   * get photos from database
   *
   * @param {number} chunkSize
   * @returns {Promise<{[index:string]:Photo}|{}>}
   */
  getChunkPhotos = async chunkSize => {
    return new Promise((resolve, _reject) => {
      let photos = {};
      this._storage
        .iterate((photo, key, i) => {
          if (i > chunkSize) {
            return photos;
          }
          photos[key] = photo;
        })
        .then(() => {
          resolve(photos);
        })
        .catch(error => {
          /* eslint-disable-next-line */
          console.error(`[Error in getChunkPhotos] => `, error);
          resolve(photos);
        });
    });
  };
}

export const createPhotoStorageInstance = wonId => new PhotoStorage(wonId);
