import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRedux } from '@redux';
// import { uploadPhoto } from '@redux/uploadPhotos/actions';
import { createPhotoStorageInstance } from 'helpers/photoStorage';

import { removePhotoMeta, uploadingPhotos } from '@redux/photosMeta/actions';

export const usePhotoUpload = () => {
  const photosMeta = useRedux('photosMeta'); //@ts-ignore
  //@ts-ignore
  const offlineState = useSelector(state => state.offline);
  const d = useDispatch();

  const [uploadInstances, setUploadInstances] = useState({});

  const endedUpload = (key, status) => {
    console.log('===== Upload Ended =====', status);
    if (status) {
      d(removePhotoMeta(key));
    }
    delete uploadInstances[key];
    setUploadInstances({
      ...uploadInstances
    });
  };

  const uploading = (key, result) => {
    d(uploadingPhotos(key, result));
    console.log('===== Uploading now =====', result);
  };

  const createUploadInstance = wonId => {
    const uploadInstance = createPhotoStorageInstance(wonId);
    uploadInstance.startUpload(2, uploading, endedUpload);
    setUploadInstances({
      ...uploadInstances,
      [wonId]: uploadInstance
    });
  };

  useEffect(() => {
    const upload = async () => {
      try {
        console.log('===== Existing workorders =====', photosMeta);
        Object.keys(photosMeta).forEach(wonId => {
          if (Object.keys(uploadInstances).includes(wonId) || !photosMeta[wonId]?.total) {
            return;
          }
          createUploadInstance(wonId);
        });
      } catch (error) {
        /* eslint-disable-next-line */
        console.log('[Error in upload queue] => ', error);
      }
    };

    if (offlineState.online) {
      // upload();
    }
  }, [photosMeta, offlineState]);
};
