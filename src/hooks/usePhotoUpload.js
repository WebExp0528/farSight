import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRedux } from '@redux';
import { uploadPhoto } from '@redux/uploadPhotos/actions';

export const usePhotoUpload = () => {
  const storagePhotos = useRedux('uploadPhotos');
  const d = useDispatch();

  useEffect(() => {
    const workOrderIds = Object.keys(storagePhotos);
    if (!workOrderIds.length) {
      return;
    }
    d(uploadPhoto(workOrderIds[0], storagePhotos[workOrderIds[0]].photos[0]));
  }, [storagePhotos]);
};
