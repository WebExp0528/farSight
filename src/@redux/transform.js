import { createTransform } from 'redux-persist';

const photoUploadTransform = createTransform(
  (inboundState, _key) => inboundState,
  (outboundState, _key) => {
    const transformed = Object.keys(outboundState).reduce((acc, key) => {
      const oldData = outboundState[key];
      if (oldData.isConverting || oldData.isUploading) {
        oldData.isConverting = false;
        oldData.isUploading = false;
      }
      acc[key] = { ...oldData };
      return acc;
    }, {});
    return { ...transformed };
  },
  { whitelist: ['uploadPhotos'] }
);

export default [photoUploadTransform];
