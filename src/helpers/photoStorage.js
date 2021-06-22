import CryptoJS from 'crypto-js';
import localforage from 'localforage';

import axios from './axios';
import { readFileAsBase64, readFileAsArrayBuffer } from './readFile';
import ImageResizer, { imageResizeConfig } from './ImageResizer';
import { base64ToBlob } from './base64ToBlob';
import resizedPhotos from '@redux/resizedPhotos';

const PHOTO_STORE_NAME = '@PhotoStore';
const PHOTO_META_STORE_NAME = '@PhotoStoreMeta';

class PhotoStorageMeta {
  /**
   * @type {import('localforage')}
   */
  _storage = null;

  /**
   *
   */
  constructor() {
    this._storage = localforage.createInstance({
      name: PHOTO_STORE_NAME,
      storeName: PHOTO_META_STORE_NAME
    });
  }

  /**
   *
   * @param {string} wonId
   * @param {number} total
   * @returns
   */
  setPhotoMeta = (wonId, total) => this._storage.setItem(wonId, total);

  /**
   *
   * @param {string} wonId
   * @returns {Promise<number>}
   */
  getPhotoMeta = wonId => this._storage.getItem(wonId);

  dropInstance = () => this._storage.dropInstance();

  getAllWorkOrderIds = () => this._storage.keys();

  getAllMeta = () => {
    return new Promise((resolve, reject) => {
      let metaInfo = {};
      this._storage
        .iterate((value, key) => {
          metaInfo[key] = value;
        })
        .then(() => {
          resolve(metaInfo);
        })
        .catch(err => {
          /* eslint-disable-next-line */
          console.error(`[Error in getAllMeta] => `, err);
          reject(err);
        });
    });
  };

  removeWorkOrder = wonId => {
    this._storage.removeItem(wonId);
  };
}

export const photoStorageMetaInstance = new PhotoStorageMeta();

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
        try {
          const file = files[i];
          const imageResizer = new ImageResizer();
          const resizedPhoto = await imageResizer.readAndCompressImage(file, imageResizeConfig);
          const base64Photo = await readFileAsBase64(resizedPhoto);

          // read resized image file
          const imageData = await readFileAsArrayBuffer(resizedPhoto);
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
          console.error(`[Error in setPhotos] => err`, err, files[i]);
          callback(false);
        }
      }
      const totalLength = await this._storage.length();
      photoStorageMetaInstance.setPhotoMeta(this._wonId, totalLength);
    } catch (error) {
      /* eslint-disable-next-line */
      console.error(`[Error in setPhotos] => err`, error);
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

  startUpload = callback => {
    this._storage
      .iterate(async (photo, key) => {
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
          this._storage.removeItem(key);
          callback(key);
        } catch (error) {
          /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
          console.error('Upload has not completed for WordOrder: ', this._wonId);
          console.log('error', error);
          callback(key);
        }
      })
      .then(() => {
        /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
        console.log('Upload has completed for WordOrder: ', this._wonId);
        photoStorageMetaInstance.removeWorkOrder(this._wonId);
        this.dropInstance();
      })
      .catch(_err => {
        // This code runs if there were any errors
        /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
        console.error('Upload has not completed for WordOrder: ', this._wonId);
      });
  };
}

export const createPhotoStorageInstance = wonId => new PhotoStorage(wonId);
