import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

import { usePreviousState } from 'hooks/usePreviousState';

const UploadProgressBar = ({ wonId, onCompleted = () => {} }) => {
  //@ts-ignore
  const uploadMeta = useSelector(state => state.photosMeta[wonId]);
  const previousUploadMeta = usePreviousState(uploadMeta);

  const { total = 0, success = 0, failed = 0 } = uploadMeta || {};
  const progress = Math.floor(((success + failed) / total) * 100);

  React.useEffect(() => {
    if (!uploadMeta && previousUploadMeta && !previousUploadMeta.isResizing) {
      onCompleted();
    }
  }, [uploadMeta]);

  if (!uploadMeta || uploadMeta.isResizing || progress === 0 || progress > 100) return null;

  return (
    <div>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      {`Uploaded ${success + failed}(success: ${success}, failed: ${failed}) of ${total} photos`}
    </div>
  );
};

export default UploadProgressBar;
