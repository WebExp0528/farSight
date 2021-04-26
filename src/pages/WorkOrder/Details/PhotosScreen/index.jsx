import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { Button, Card, Container, Form, Image, Row, Col, Tab, ProgressBar, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

import ImageResizer from './ImageResizer';

const imageResizeConfig = {
  quality: 0.5,
  maxWidth: 640,
  maxHeight: 640,
  autoRotate: true
};

const previewPageSize = 10;

class PhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      fileInputState: null,
      reviewUploadedPage: { before: 0, during: 0, after: 0 },
      uploadedImages: { before: [], during: [], after: [] },
      previewSources: [],
      selectedFiles: [],
      successMsg: '',
      errMsg: '',
      key: props?.match?.params?.category || '',
      isUploading: false
    };
    this.uploadedCount = 0;
    this.fileInputRef = React.createRef();
    this.uploadFormRef = React.createRef();
    this.imageResizers = [
      new ImageResizer(),
      new ImageResizer(),
      new ImageResizer(),
      new ImageResizer(),
      new ImageResizer(),
      new ImageResizer()
    ];
  }

  getUploadedPhotos = () => {
    fetch('/api/work_order/' + this.props.won + '/photo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.ERRORS && data.ERRORS.length > 0) {
          alert(JSON.stringify(data.ERRORS));
          return;
        }
        data.forEach(item => {
          this.setState((state, props) => {
            let myuploadedImages = state.uploadedImages;

            myuploadedImages[item.label] = [...state.uploadedImages[item.label], item.image_url_full];
            return {
              uploadedImages: myuploadedImages
            };
          });
        });
      })
      .catch(err => console.error(err));
  };

  componentDidMount = () => {
    this.getUploadedPhotos();
  };

  handleFileInputChange = e => {
    const files = [...e.target.files];
    this.previewFiles(files); //convert non-array FileList to Array by deconstruction
    this.setState({ selectedFiles: files });
    this.setState({ fileInputState: e.target.value });
  };

  previewFiles = files => {
    files.forEach(file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState((state, props) => {
          return {
            previewSources: [...state.previewSources, reader.result],
            key: 'preview'
          };
        });
        reader.src = null;
      };
    });
  };

  handleSubmitFile = async e => {
    const category = e.target.name;
    e.preventDefault();
    if (!this.state.selectedFiles) return;

    console.log('All Files');
    console.log(this.state.selectedFiles);
    const maxUploadTasks = 6; //Max allowed by browsers anyway.
    const numFileSegments = Math.min(this.state.selectedFiles.length, maxUploadTasks);
    const segmentLength = Math.ceil(this.state.selectedFiles.length / numFileSegments); //
    const filelistSegments = this.chunkArray(this.state.selectedFiles, segmentLength);
    console.log('Segments');
    console.log(filelistSegments);
    console.log('UPLOADING WITH LABEL' + category);
    this.setState({ isUploading: true });
    this.uploadedCount = 0;

    //Start number of tasks = numFileSegments
    for (let i = 0; i < numFileSegments; i++) {
      if (filelistSegments[i]) {
        console.log('starting segment : ' + i);
        this.uploadNextFile(filelistSegments[i], category, i);
      } else {
        console.log('skipping empty segment : ' + i);
      }
    }
  };
  uploadNextFile = async (files, category, pipeId) => {
    console.log('files left in pipe ' + pipeId + ' before Upload ' + files.length);
    let currentFile = files.pop();

    this.imageResizers[pipeId]
      .readAndCompressImage(currentFile, imageResizeConfig)
      .then(resizedImage => {
        console.log('image compressed in pipeId ' + pipeId);
        this.uploadImage(resizedImage, category, currentFile.name, pipeId)
          .then(() => {
            console.log('UPLOAD DONE');
            console.log('files left in pipe  ' + pipeId + ' after Upload ' + files.length);
            this.uploadedCount++;
            let currentProgress = Math.floor((this.uploadedCount / this.state.selectedFiles.length) * 100.0);
            this.setState({ progress: currentProgress });
            if (this.uploadedCount === this.state.selectedFiles.length) {
              this.setState({
                progress: 0,
                fileInputState: '',
                previewSources: '',
                successMsg: 'Image uploaded successfully',
                key: 'main'
              });
              this.getUploadedPhotos();
            } else if (files.length > 0) {
              console.log('uploading next file in pipe ' + pipeId + '.');
              this.uploadNextFile(files, category, pipeId);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  readFileAsync = async file => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(CryptoJS.lib.WordArray.create(reader.result));
      };
      reader.onloadend = f => {
        f.src = null; //clear the file reader memory.
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  };

  uploadImage = async (imageFile, label, filename, pipeId) => {
    return new Promise((resolve, reject) => {
      this.readFileAsync(imageFile).then(buffer => {
        let checksum = CryptoJS.MD5(buffer).toString();
        let fileId = checksum.toString();
        console.log(filename + ':' + fileId);
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
          imageLabel: label
        };
        let formData = new FormData();
        formData.append('payload', JSON.stringify(data));
        formData.append('file', imageFile, filename);
        let options = {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        };
        formData = null;
        buffer = null;
        delete options.headers['Content-Type']; //remove default json content type
        fetch('/api/work_order/' + this.props.won + '/photo', options)
          .then(resp => {
            if (!resp.ok) {
              throw resp;
            }
            console.log('upload response OK in pipeId ' + pipeId);
            return resp;
          })
          .then(data => {
            console.log(data);
            console.log('resolving: true in pipeId ' + pipeId);
            resolve(true);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              errMsg: 'Something went wrong in pipe! pipeId ' + pipeId
            });
            console.log('rejecting');
            reject(err);
          });
      });
    });
  };

  selectFile = category => {
    this.uploadFormRef.name = category;
    this.forceUpdate();
    this.fileInputRef.click();
  };

  getPageOfArray = (myArray, page) => {
    let pagedArray = this.chunkArray(myArray, previewPageSize);
    if (pagedArray.length > 0) {
      return pagedArray[page];
    } else {
      return [];
    }
  };

  chunkArray = (myArray, chunk_size) => {
    let index = 0;
    let tempArray = [];
    if (myArray) {
      let arrayLength = myArray.length;
      for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
      }
    }
    return tempArray;
  };

  renderPhotoControl = category => {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="alert-info">
            <FontAwesomeIcon icon={faCamera} size="lg" className="float-left" />
            <h5>{category.toUpperCase()} PHOTOS</h5>
          </Card.Header>
          <Card.Header>
            <Row>
              <Button
                onClick={() => {
                  this.selectFile(category);
                }}
                block
              >
                UPLOAD IMAGES
                <FontAwesomeIcon icon={faUpload} size="lg" className="float-right" />
              </Button>
            </Row>
            <Row>
              <Accordion.Toggle as={Button} block variant="link" eventKey="0">
                View {this.state.uploadedImages[category].length} Uploaded Images...
              </Accordion.Toggle>
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
      </Accordion>
    );
  };
  render = () => {
    const category = this?.props?.match?.params?.category || '';
    return (
      <>
        <Form
          onSubmit={this.handleSubmitFile}
          ref={ref => {
            this.uploadFormRef = ref;
          }}
          name="before"
          className="form"
        >
          <Form.Group hidden controlId="fileInput">
            <Form.File name="image">
              <Form.File.Input
                accept="image/jpeg"
                multiple
                onChange={this.handleFileInputChange}
                value={this.state.fileInputState}
                ref={ref => {
                  this.fileInputRef = ref;
                }}
              ></Form.File.Input>
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
}

export default PhotoScreen;
