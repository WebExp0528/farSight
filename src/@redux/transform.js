import { createTransform } from 'redux-persist';

const photoUploadTransform = createTransform(
  (inboundState, _key) => inboundState,
  (outboundState, _key) => {
    const transformed = Object.keys(outboundState).reduce((acc, key) => {
      const oldData = outboundState[key];
      if (oldData.isResizing) {
        oldData.isResizing = false;
      }
      acc[key] = { ...oldData };
      return acc;
    }, {});
    return { ...transformed };
  },
  { whitelist: ['photosMeta'] }
);

export default [photoUploadTransform];
