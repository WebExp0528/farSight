import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRedux } from '@redux';
// import { uploadPhoto } from '@redux/uploadPhotos/actions';
import { photoStorageMetaInstance, createPhotoStorageInstance } from 'helpers/photoStorage';

export const usePhotoUpload = () => {
  const storagePhotos = useRedux('uploadPhotos');
  //@ts-ignore
  const offlineState = useSelector(state => state.offline);
  const d = useDispatch();

  const uploadedPhoto = wonId => {
    console.log('~~~~~~~~ uploaded workorder', wonId);
  };

  useEffect(() => {
    const upload = async () => {
      const workOrders = await photoStorageMetaInstance.getAllWorkOrderIds();
      workOrders.forEach(wonId => {
        // createPhotoStorageInstance(wonId).startUpload(uploadedPhoto);
      });
    };
    upload();
  }, []);
};
