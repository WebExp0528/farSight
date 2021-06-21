import localforage from 'localforage';
import { readFileAsBase64, readFileAsArrayBuffer } from './readFile';
import ImageResizer, { imageResizeConfig } from './ImageResizer';
import CryptoJS from 'crypto-js';

const PHOTO_STORE_NAME = '@PhotoStore';
const PHOTO_META_STORE_NAME = '@PhotoStoreMeta';

class PhotoStorageMeta {
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
  setPhotoMeta = async (wonId, total) => {
    try {
      const oldTotal = await this.getPhotoMeta(wonId);
      console.log('~~~~~ get totla', oldTotal);
      this._storage.setItem(wonId, oldTotal ? oldTotal + total : total);
    } catch (err) {
      console.error(`[Error in setPhotoMeta] => err`, err);
      return err;
    }
  };

  /**
   *
   * @param {string} wonId
   * @returns {Promise<number>}
   */
  getPhotoMeta = wonId => this._storage.getItem(wonId);
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
   * @returns
   */
  setPhotos = async (files, category) => {
    photoStorageMetaInstance.setPhotoMeta(this._wonId, files.length);
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

        this._storage.setItem(this.genId(data), data);
      } catch (err) {
        console.error(`[Error in setPhotos] => err`, err, files[i]);
        return err;
      }
    }
  };

  /**
   *
   * @param {Photo} data
   */
  genId = data => {
    return `${data.imageLabel}_${data.uuid}`;
  };
}

export const createPhotoStorageInstance = wonId => new PhotoStorage(wonId);
