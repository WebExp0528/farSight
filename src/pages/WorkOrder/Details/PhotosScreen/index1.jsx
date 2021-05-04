import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { Button, Card, Container, Form, Image, Row, Col, Tab, ProgressBar, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

import ImageResizer from './ImageResizer';

import { get as getPhotos } from '@redux/workOrderPhotos/actions';
import { Add as addToast } from '@redux/toast/actions';
import { render } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useRedux } from '@redux';

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
  const { category = '', wonId } = props?.match?.params || {};

  const workOrderPhotosState = useRedux('workOrderPhotos');

  const [uploadedCount, setUploadedCount] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [previewFiles, setPreviewFiles] = React.useState([]);
  const showUploadedImageControls = useIsOpenControls();

  const [page, setPage] = React.useState(1);

  const fileInputRef = React.useRef();
  const uploadFormRef = React.useRef();

  React.useEffect(() => {
    d(getPhotos(wonId));
  }, []);

  const progress = files.length ? (uploadedCount / files.length) * 100 : 0;
  const totalPage = files.length / previewPageSize;

  const uploadedImages = workOrderPhotosState.data.map(el => el);

  const handleFileInputChange = e => {
    setFiles(e.target.files);
    setPage(1);
  };

  const handleSubmitFile = async e => {
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
        console.log('===== Uploading file', files[i].file, i);
        await uploadFile(files[i].file);
        setUploadedCount(uploadedCount + 1);
        continue;
      } catch (error) {
        console.log('===== Could not upload file: error=>', error);
        continue;
      }
    }
    setUploading(false);
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
      console.log(`===== ${filename} : ${fileId}`);
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
      formData.append('file', imageData, filename);
      let options = {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      const res = await axios.post(`/api/work_order/${wonId}/photo`, formData);

      console.log('~~~~~~~~~ uploaded image', res);
      return res;
    } catch (err) {
      console.log('===== Could not upload file: error=>', err);
      throw err;
    }
  };

  const handleClickUploadImageBtn = e => {
    fileInputRef.click();
  };

  const renderPhotoControl = category => {
    return (
      <Card>
        <Card.Header className="alert-info">
          <FontAwesomeIcon icon={faCamera} size="lg" className="float-left" />
          <h5>{category.toUpperCase()} PHOTOS</h5>
        </Card.Header>
        <Card.Header>
          <Row>
            <Button onClick={handleFileInputChange} block>
              UPLOAD IMAGES
              <FontAwesomeIcon icon={['fas', 'upload']} size="lg" className="float-right" />
            </Button>
          </Row>
          <Row>
            <col>View {uploadedImages[category].length} Uploaded Images...</col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Footer>
            {this.chunkArray(
              this.getPageOfArray(this.state.uploadedImages[category], this.state.reviewUploadedPage[category]),
              2
            ).map((chunk, index) => {
              return (
                <Row key={index}>
                  {chunk.map((imageSource, index) => {
                    return (
                      <Col key={index}>
                        <Image src={imageSource} alt="chosen" thumbnail fluid />
                      </Col>
                    );
                  })}
                  {chunk.length === 1 ? <Col /> : null}
                </Row>
              );
            })}
            <Row className="justify-content-md-center">
              <Col>
                <Button
                  hidden={this.state.reviewUploadedPage[category] === 0}
                  onClick={() =>
                    this.setState((state, props) => {
                      let reviewUploadedPage = this.state.reviewUploadedPage;
                      reviewUploadedPage[category] = reviewUploadedPage[category] - 1;
                      return {
                        reviewUploadedPage: reviewUploadedPage
                      };
                    })
                  }
                  block
                >
                  &lt;Prev.
                </Button>
              </Col>
              <Col>
                Page {this.state.reviewUploadedPage[category] + 1}/
                {Math.ceil(this.state.uploadedImages[category].length / previewPageSize)}
              </Col>
              <Col>
                <Button
                  hidden={
                    this.state.reviewUploadedPage[category] >=
                    Math.ceil(this.state.uploadedImages[category].length / previewPageSize) - 1
                  }
                  onClick={() =>
                    this.setState((state, props) => {
                      let reviewUploadedPage = this.state.reviewUploadedPage;
                      reviewUploadedPage[category] = reviewUploadedPage[category] + 1;
                      return {
                        reviewUploadedPage: reviewUploadedPage
                      };
                    })
                  }
                  block
                >
                  Next &gt;
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Accordion.Collapse>
      </Card>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmitFile} ref={uploadFormRef} name="before" className="form">
        <Form.Group hidden controlId="fileInput">
          <Form.File name="image">
            <Form.File.Input accept="image/jpeg" multiple onChange={handleFileInputChange} ref={fileInputRef} />
          </Form.File>
        </Form.Group>
      </Form>
      {category === 'preview' ? (
        <React.Fragment>
          <Row>
            <br />
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  this.uploadFormRef.dispatchEvent(new Event('submit'));
                }}
                variant="success"
                block
                disabled={this.state.isUploading}
              >
                Submit Photos
                <FontAwesomeIcon className="float-right" icon={faPaperPlane} size="lg" />{' '}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProgressBar now={this.state.progress} label={`${this.state.progress}%`} />
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          <Row>
            <Col>
              <h4>You have selected {this.state.previewSources.length} files.</h4>
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          <Row>
            <Col>
              <h5>Press "Submit Photos" above to complete the upload.</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              Do not close this tab until the upload is complete. You can safely open other apps. (maybe... we should
              test this){' '}
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        this.renderPhotoControl(category)
      )}
    </>
  );
};

export default PhotoScreen;
