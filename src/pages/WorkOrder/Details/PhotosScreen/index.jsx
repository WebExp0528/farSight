import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { Button, Card, Form, Row, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { useRedux, useReduxLoading } from '@redux';
import { get as getPhotosAction } from '@redux/workOrderPhotos/actions';
import { set as setPreUploadPhotos } from '@redux/uploadPhotos/actions';
import { setTotalSavedPhotos } from '@redux/photosMeta/actions';
import { ContentLoader, ButtonLoading, NavigationBlocker } from 'components';

import { useIsOpenControls } from 'hooks/useIsOpenControl';
import { createPhotoStorageInstance } from 'helpers/photoStorage';
import PreviewImages from './PreviewImages';
import { UploadProgressBar } from 'pages/WorkOrder/components';

const getBGByCategory = category => {
  switch (category) {
    case 'before':
      return 'bg-warning';
    case 'during':
      return 'bg-info';
    case 'after':
      return 'bg-success';

    default:
      return 'bg-info';
  }
};

const ResizedCountInitialValue = { success: 0, failed: 0 };

const PhotoScreen = props => {
  const d = useDispatch();
  const { category = '', won: wonId } = props?.match?.params || {};

  const workOrderPhotosState = useRedux('workOrderPhotos');

  const [isStoring, setStoring] = React.useState(false);
  const [resizedCount, setResizedCount] = React.useState(ResizedCountInitialValue);

  const [files, setFiles] = React.useState([]);
  const previewControls = useIsOpenControls();

  const fileInputRef = React.useRef();
  const uploadFormRef = React.useRef();

  const getPhotos = () => {
    d(getPhotosAction(wonId));
  };

  React.useEffect(getPhotos, []);

  if (useReduxLoading('workOrderPhotos')) {
    return <ContentLoader>Loading Photos...</ContentLoader>;
  }

  const handleFileInputChange = e => {
    setFiles(e.target.files);
  };

  const handleResizeCallback = status => {
    setResizedCount(value => {
      if (status) {
        return {
          ...value,
          success: value.success + 1
        };
      } else {
        return {
          ...value,
          failed: value.failed + 1
        };
      }
    });
  };

  const handleSubmitFile = async e => {
    e.preventDefault();

    setStoring(true);
    const photoStorageInstance = createPhotoStorageInstance(wonId);
    d(setTotalSavedPhotos(wonId, 0));

    // Split files
    let myfiles = [...files];

    let chunks = [],
      chunkSize = myfiles.length / 8;
    for (let i = 0; i < myfiles.length; i += chunkSize) {
      chunks.push(myfiles.slice(i, i + chunkSize));
    }

    try {
      await Promise.all(chunks.map(c => photoStorageInstance.setPhotos(c, category, handleResizeCallback)));
      const savedPhotoCount = await photoStorageInstance.getLength();

      setResizedCount(ResizedCountInitialValue);
      setFiles([]);
      d(setTotalSavedPhotos(wonId, savedPhotoCount));
      setStoring(false);
    } catch (error) {
      /* eslint-disable-next-line */
      console.log(`[Error in handleSubmitFile] =>`, error);
    }
  };

  const handleClickUploadImageBtn = () => {
    // @ts-ignore
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleUploadingCompleted = () => {
    setTimeout(() => {
      getPhotos();
    }, 1000);
  };

  const uploadedImages = workOrderPhotosState.data.filter(item => item.label === category);

  const progress = isStoring ? ((resizedCount.success + resizedCount.failed) / files.length) * 100 : 0;

  const renderPhotoControl = () => {
    return (
      <Card>
        <Card.Header className={getBGByCategory(category)}>
          <FontAwesomeIcon icon={faCamera} size="lg" className="float-start" />
          <h5 className="mb-0">{` ${category.toUpperCase()} PHOTOS`}</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Button
              variant="link"
              className="col card-link text-capitalize text-center"
              onClick={previewControls.handleToggle}
              style={{ userSelect: 'none' }}
            >
              {previewControls.isOpen ? 'Hide Images' : `View ${(uploadedImages || []).length} Uploaded Images...`}
            </Button>
          </Row>
          {previewControls.isOpen && (
            <Row>
              <PreviewImages data={uploadedImages} type="url" />
            </Row>
          )}
        </Card.Body>
        <Card.Footer className="d-grid">
          <Button onClick={handleClickUploadImageBtn}>
            UPLOAD IMAGES
            <FontAwesomeIcon icon={['fas', 'upload']} size="lg" className="float-end" />
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <React.Fragment>
      <NavigationBlocker navigationBlocked={isStoring} />
      <UploadProgressBar wonId={wonId} onCompleted={handleUploadingCompleted} />
      <Form ref={uploadFormRef} name="before" className="form">
        <Form.Group hidden controlId="fileInput">
          <Form.Control
            type="file"
            name="image"
            accept="image/jpeg"
            multiple
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </Form.Group>
      </Form>
      {files.length ? (
        <React.Fragment>
          <div className="d-grid">
            <ButtonLoading onClick={handleSubmitFile} variant="success" isLoading={isStoring}>
              Submit Photos
              <FontAwesomeIcon className="float-right" icon={['fas', 'paper-plane']} size="lg" />
            </ButtonLoading>
          </div>
          <br />
          {isStoring && (
            <div>
              <ProgressBar animated now={progress} />
              <p>{`Resized ${resizedCount.success + resizedCount.failed}(Success: ${resizedCount.success}, Failed: ${
                resizedCount.failed
              }) of ${files.length} Photos`}</p>
            </div>
          )}
          <br />
          <div className="h4">{`You have selected ${files.length} files.`}</div>
          <div className="h5">{`Press "Submit Photos" above to complete the upload.`}</div>
          <div>
            {`Do not close this tab until the upload is complete. You can safely open other apps. (maybe... we should test this)`}
          </div>
        </React.Fragment>
      ) : (
        renderPhotoControl()
      )}
    </React.Fragment>
  );
};

export default connect(null, {
  setPreUploadPhotosAction: setPreUploadPhotos
})(PhotoScreen);
