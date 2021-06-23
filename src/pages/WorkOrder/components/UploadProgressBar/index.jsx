import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

const UploadProgressBar = ({ wonId }) => {
  //@ts-ignore
  const uploadMeta = useSelector(state => state.photosMeta[wonId]);
  if (!uploadMeta) return null;
  const { total, success, failed } = uploadMeta;

  const progress = Math.floor(((success + failed) / total) * 100);

  return (
    <div>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      {`Uploaded ${success + failed}(success: ${success}, failed: ${failed}) of ${total} photos`}
    </div>
  );
};

export default UploadProgressBar;
