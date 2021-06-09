import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRedux } from '@redux';
import { uploadPhoto } from '@redux/uploadPhotos/actions';

export const usePhotoUpload = () => {
  const storagePhotos = useRedux('uploadPhotos');
  //@ts-ignore
  const offlineState = useSelector(state => state.offline);
  const d = useDispatch();

  useEffect(() => {
    const workOrderIds = Object.keys(storagePhotos);
    if (!workOrderIds.length || !offlineState.online) {
      return;
    }
    const wonId = workOrderIds[0];
    const wonData = storagePhotos[wonId];
    if (wonData.isConverting || wonData.isUploading) {
      return;
    }

    d(uploadPhoto(wonId, wonData.photos[0]));
  }, [storagePhotos]);
};
