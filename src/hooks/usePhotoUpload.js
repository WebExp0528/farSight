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
    const wonId = Object.keys(storagePhotos).find(key => {
      const tmp = storagePhotos[key];
      return !tmp.isConverting && !tmp.isUploading && tmp.photos && tmp.photos.length;
    });

    if (!wonId || !offlineState.online) {
      return;
    }
    const wonData = storagePhotos[wonId];
    if (!wonData || wonData.isConverting || wonData.isUploading || !wonData.photos || !wonData.photos.length) {
      return;
    }

    d(uploadPhoto(wonId, wonData.photos[0]));
  }, [storagePhotos]);
};
