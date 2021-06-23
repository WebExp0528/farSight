import CryptoJS from 'crypto-js';

/**
 * Read file as base 64 file type
 *
 * @param {*} file
 */
export const readFileAsBase64 = file => {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', () => {
      resolve(reader);
    });
  });
};
export const arrayBufferToBase64 = async buffer => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
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
