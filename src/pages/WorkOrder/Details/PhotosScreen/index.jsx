import React from 'react';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Button, Card, Form, Row, Col, ProgressBar, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { useRedux, useReduxLoading } from '@redux';
import { get as getPhotos } from '@redux/workOrderPhotos/actions';
import { Add as addToast } from '@redux/toast/actions';
import ContentLoader from 'components/ContentLoader';

import ImageResizer from './ImageResizer';

import { axios, readFileAsync } from 'helpers';
import { useIsOpenControls } from 'hooks/useIsOpenControl';

/* eslint-disable no-console */

const imageResizeConfig = {
  quality: 0.5,
  maxWidth: 640,
  maxHeight: 640,
  autoRotate: true
};

const previewPageSize = 10;

const PhotoScreen = props => {
  const d = useDispatch();
  const { category = '', won: wonId } = props?.match?.params || {};

  const workOrderPhotosState = useRedux('workOrderPhotos');

  const [uploadedCount, setUploadedCount] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const showUploadedImageControls = useIsOpenControls();

  const fileInputRef = React.useRef();
  const uploadFormRef = React.useRef();

  React.useEffect(() => {
    d(getPhotos(wonId));
  }, []);

  if (useReduxLoading('workOrderPhotos')) {
    return <ContentLoader>Loading Photos...</ContentLoader>;
  }

  const progress = files.length ? (uploadedCount / files.length) * 100 : 0;

  const handleFileInputChange = e => {
    setFiles(e.target.files);
  };

  const handleSubmitFile = async e => {
    console.log('```` submitting', e);
    e.preventDefault();
    if (!files.length) {
      d(
        addToast({
          type: 'error',
          content: 'Please Select File'
        })
      );
      return;
    }
    setUploading(true);
    const maxUploadTasks = 6; //Max allowed by browsers anyway.
    const numFileSegments = Math.min(files.length, maxUploadTasks);

    //Start number of tasks = numFileSegments
    for (let i = 0; i < numFileSegments; i++) {
      try {
        console.log('===== Uploading file', files[i], i);
        await uploadFile(files[i]);
        setUploadedCount(uploadedCount + 1);
        continue;
      } catch (error) {
        console.log('===== Could not upload file: error=>', error);
        continue;
      }
    }
    setUploading(false);
    d(
      addToast({
        type: 'success',
        content: 'Successfully uploaded files.'
      })
    );
    setFiles([]);
  };

  /**
   * Upload file
   *
   * @param {*} file
   * @returns
   */
  const uploadFile = async file => {
    try {
      const imageResizer = new ImageResizer();
      const resizedImage = await imageResizer.readAndCompressImage(file, imageResizeConfig);

      // read resized image file
      const imageData = await readFileAsync(resizedImage);
      const filename = file.name;

      let checksum = CryptoJS.MD5(imageData).toString();
      let fileId = checksum.toString();

      let data = {
        evidenceType: 'photo',
        fileExt: 'jpg',
        fileName: filename,
        fileType: 'picture',
        timestamp: null,
        gpsAccuracy: null,
        gpsLatitude: null,
        gpsLongitude: null,
        gpsTimestamp: null,
        parentUuid: '',
        uuid: fileId,
        imageLabel: category
      };

      // Making Form Data
      let formData = new FormData();
      formData.append('payload', JSON.stringify(data));
      formData.append('file', resizedImage, filename);

      const res = await axios.post(`/api/work_order/${wonId}/photo`, formData);

      return res;
    } catch (err) {
      console.log('===== Could not upload file: error=>', err);
      throw err;
    }
  };

  const handleClickUploadImageBtn = e => {
    // @ts-ignore
    fileInputRef.current && fileInputRef.current.click();
  };

  const uploadedImages = workOrderPhotosState.data.reduce((acc, item) => {
    return {
      ...acc,
      [item.label]: [...(acc[item.label] ? acc[item.label] : []), item]
    };
  }, {});

  const renderPhotoControl = () => {
    return (
      <Card>
        <Card.Header className="alert-info">
          <FontAwesomeIcon icon={faCamera} size="lg" className="float-left" />
          <h5>{category.toUpperCase()} PHOTOS</h5>
        </Card.Header>
        <Card.Header>
          <Row>
            <Button onClick={handleClickUploadImageBtn} block>
              UPLOAD IMAGES
              <FontAwesomeIcon icon={['fas', 'upload']} size="lg" className="float-right" />
            </Button>
          </Row>
          <Row>
            <Col>View {uploadedImages[category].length} Uploaded Images...</Col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Footer>{/* TODO: Render preview */}</Card.Footer>
        </Accordion.Collapse>
      </Card>
    );
  };

  return (
    <>
      <Form ref={uploadFormRef} name="before" className="form">
        <Form.Group hidden controlId="fileInput">
          <Form.File name="image">
            <Form.File.Input accept="image/jpeg" multiple onChange={handleFileInputChange} ref={fileInputRef} />
          </Form.File>
        </Form.Group>
      </Form>
      {files.length ? (
        <React.Fragment>
          <div className="">
            <Button onClick={handleSubmitFile} variant="success" block disabled={uploading}>
              Submit Photos
              <FontAwesomeIcon className="float-right" icon={['fas', 'paper-plane']} size="lg" />
            </Button>
          </div>
          <br />
          <div>
            <ProgressBar now={progress} label={`${progress}%`} />
          </div>
          <br />
          <div className="h4">{`You have selected ${files.length} files.`}</div>
          <div className="h5">Press "Submit Photos" above to complete the upload.</div>
          <div>
            {`Do not close this tab until the upload is complete. You can safely open other apps. (maybe... we should test this)`}
          </div>
        </React.Fragment>
      ) : (
        renderPhotoControl()
      )}
    </>
  );
};

export default PhotoScreen;
