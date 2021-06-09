import CryptoJS from 'crypto-js';

/**
 * Read file as base 64 file type
 *
 * @param {*} file
 */
export const readFileAsBase64 = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', event => {
      resolve(reader);
    });
  });
};

export const readFileAsArrayBuffer = async file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      //@ts-ignore
      resolve(CryptoJS.lib.WordArray.create(reader.result));
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};
