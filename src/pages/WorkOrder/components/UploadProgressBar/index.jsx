import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

const UploadProgressBar = ({ wonId, onCompleted = () => {} }) => {
  //@ts-ignore
  const uploadMeta = useSelector(state => state.photosMeta[wonId]);
  const { total = 0, success = 0, failed = 0 } = uploadMeta || {};
  const progress = Math.floor(((success + failed) / total) * 100);

  React.useEffect(() => {
    if (progress === 100) {
      onCompleted();
    }
  }, [progress]);

  if (!uploadMeta || !uploadMeta.total) return null;

  return (
    <div>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      {`Uploaded ${success + failed}(success: ${success}, failed: ${failed}) of ${total} photos`}
    </div>
  );
};

export default UploadProgressBar;
