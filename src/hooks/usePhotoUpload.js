import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRedux } from '@redux';
// import { uploadPhoto } from '@redux/uploadPhotos/actions';
import { photoStorageMetaInstance, createPhotoStorageInstance } from 'helpers/photoStorage';
import workOrders from '@redux/workOrders';

export const usePhotoUpload = () => {
  const storagePhotos = useRedux('uploadPhotos');
  //@ts-ignore
  const offlineState = useSelector(state => state.offline);
  const d = useDispatch();

  let uploadInstances = {};

  const endedUpload = (key, status) => {
    console.log('===== Upload Ended =====', status);
    delete uploadInstances[key];
  };

  const uploading = (key, result) => {
    console.log('===== Uploading now =====', result);
  };

  const createUploadInstance = wonId => {
    const uploadInstance = createPhotoStorageInstance(wonId);
    uploadInstance.startUpload(2, uploading, endedUpload);
    uploadInstances[wonId] = uploadInstance;
  };

  useEffect(() => {
    const upload = async () => {
      try {
        const workOrders = await photoStorageMetaInstance.getAllWorkOrderIds();
        console.log('===== Existing workorders =====', workOrders);
        workOrders.forEach(wonId => {
          if (Object.keys(uploadInstances).includes(wonId)) {
            return;
          }
          createUploadInstance(wonId);
        });
      } catch (error) {
        /* eslint-disable-next-line */
        console.log('[Error in upload queue] => ', error);
      }
    };
    upload();
  }, []);
};
