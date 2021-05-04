import CryptoJS from 'crypto-js';

/**
 *
 * @param {*} file
 * @param {(result:FileReader)=>void} onLoad
 */
export const readFile = (file, onLoad) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('loadend', event => {
    onLoad(reader);
  });
};

export const readFileAsync = async file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(CryptoJS.lib.WordArray.create(reader.result));
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};
