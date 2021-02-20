import CryptoJS from "crypto-js";
import React, { useState, Component } from "react";
// import Alert from '../components/Alert';
import { connect } from "react-redux";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Col,
  Spinner,
  Navbar,
  Toast,
  FormControl,
  Tab,
  ProgressBar,
  Accordion,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHistory,
  faEye,
  faChessRook,
  faPaperPlane,
  faBackward,
  faBars,
  faCompass,
  faCamera,
  faUpload,
  faHammer,
  faWrench,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Prev } from "react-bootstrap/esm/PageItem";
const previewPageSize = 10;
class Photoscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      fileInputState: null,
      reviewUploadedBeforePage: 0,
      reviewUploadedDuringPage: 0,
      reviewUploadedAfterPage: 0,
      uploadedBeforeImages: [],
      uploadedDuringImages: [],
      uploadedAfterImages: [],
      previewSources: [],
      selectedFiles: [],
      successMsg: "",
      errMsg: "",
      key: "main",
      isUploading: false,
    };
    this.fileInputRef = React.createRef();
    this.uploadFormRef = React.createRef();
  }

  getUploadedPhotos = () => {
    fetch("/api/work_order/" + this.props.won + "/photo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ERRORS && data.ERRORS.length > 0) {
          alert(JSON.stringify(data.ERRORS));
          return;
        }
        data.forEach((item) => {
          if (item.label === "before") {
            this.setState((state, props) => {
              return {
                uploadedBeforeImages: [
                  ...state.uploadedBeforeImages,
                  item.image_url_full,
                ],
              };
            });
          } else if (item.label === "during") {
            this.setState((state, props) => {
              return {
                uploadedDuringImages: [
                  ...state.uploadedDuringImages,
                  item.image_url_full,
                ],
              };
            });
          } else {
            this.setState((state, props) => {
              return {
                uploadedAfterImages: [
                  ...state.uploadedAfterImages,
                  item.image_url_full,
                ],
              };
            });
          }
        });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {
    this.getUploadedPhotos();
  };

  handleFileInputChange = (e) => {
    const files = e.target.files;
    this.previewFiles([...files]); //convert non-array FileList to Array by deconstruction
    this.setState({ selectedFiles: files });
    this.setState({ fileInputState: e.target.value });
  };

  previewFiles = (files) => {
    files.forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState((state, props) => {
          return {
            previewSources: [...state.previewSources, reader.result],
            key: "preview",
          };
        });
        reader.src = null;
      };
    });
  };

  handleSubmitFile = async (e) => {
    const category = e.target.name;
    e.preventDefault();
    if (!this.state.selectedFiles) return;

    const allFiles = [...this.state.selectedFiles];
    const maxUploadTasks = 6;//Max allowed by browsers anyway.
    const numFileSegments = Math.min(allFiles.length, maxUploadTasks);
    const segmentLength = Math.ceil(allFiles.length / numFileSegments); //
    const filelistSegments = this.chunkArray(allFiles, segmentLength);
    console.log("UPLOADING WITH LABEL" + category);
    this.setState({ isUploading: true });
    let uploadedCount = 0;
    const uploadNextFile = async (files) => {
      let currentFile = files.pop();
      this.uploadImage(currentFile, category, currentFile.name)
        .then(() => {
          uploadedCount++;
          let currentProgress = Math.floor(
            (uploadedCount / allFiles.length) * 100.0
          );
          this.setState({ progress: currentProgress });
          if (uploadedCount === allFiles.length) {
            this.setState({
              progress: 0,
              fileInputState: "",
              previewSources: "",
              successMsg: "Image uploaded successfully",
              key: "main",
            });
            this.getUploadedPhotos();
          } else if (files.length > 0) {
            uploadNextFile(files);
          }
        })
        .catch((err) => {});
    };
    //Start number of tasks = numFileSegments
    for (let i = 0; i < numFileSegments; i++) {
      uploadNextFile(filelistSegments[i]);
    }
  };
  async readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(CryptoJS.lib.WordArray.create(reader.result));
      };
      reader.onloadend = (f) => {
        f.src = null; //clear the file reader memory.
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }
  uploadImage = async (blobImage, label, filename) => {
    return new Promise((resolve, reject) => {
      this.readFileAsync(blobImage).then((buffer) => {
        let checksum = CryptoJS.MD5(buffer).toString();
        let fileId = checksum.toString();
        console.log(filename + ":" + fileId);
        let data = {
          evidenceType: "photo",
          fileExt: "jpg",
          fileName: filename,
          fileType: "picture",
          timestamp: null,
          gpsAccuracy: null,
          gpsLatitude: null,
          gpsLongitude: null,
          gpsTimestamp: null,
          parentUuid: "",
          uuid: fileId,
          imageLabel: label,
        };
        let formData = new FormData();
        formData.append("payload", JSON.stringify(data));
        formData.append("file", blobImage, filename);
        let options = {
          method: "POST",
          mode: "no-cors",
          body: formData,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        };
        formData = null;
        buffer = null;
        delete options.headers["Content-Type"]; //remove default json content type
        fetch("/api/work_order/" + this.props.won + "/photo", options)
          .then((resp) => {
            if (!resp.ok) {
              throw resp;
            }

            return resp;
          })
          .then((data) => {
            console.log(data);
            resolve(true);
          })
          .catch((err) => {
            console.error(err);
            this.setState({ errMsg: "Something went wrong!" });
            reject(err);
          });
      });
    });
  };
  selectFile = (category) => {
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
  render() {
    return (
      <>
        <Form
          onSubmit={this.handleSubmitFile}
          ref={(ref) => {
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
                ref={(ref) => {
                  this.fileInputRef = ref;
                }}
              ></Form.File.Input>
            </Form.File>
          </Form.Group>
        </Form>
        <Tab.Container
          id="photoTabs"
          defaultActiveKey="main"
          activeKey={this.state.key}
        >
          <Tab.Content>
            <Tab.Pane eventKey="main">
              <Container>
                {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
                <Row style={{ color: "lightgray" }}>
                  <Col xs={3}>
                    <FontAwesomeIcon icon={faCamera} size="3x" />
                  </Col>
                  <Col>
                    <h3>Upload Photos</h3>
                  </Col>
                </Row>

                <Row style={{ color: "lightgray" }}>
                  <Col>
                    Please use the buttons below to upload photos for each stage
                    of work.
                  </Col>
                </Row>

                <Accordion>
                  <Card>
                    <Card.Header>
                      <Row>
                        <Button
                          size="lg"
                          onClick={() => {
                            this.selectFile("before");
                          }}
                          block
                        >
                          BEFORE
                          <FontAwesomeIcon
                            icon={faUpload}
                            size="2x"
                            className="float-right"
                          />
                        </Button>
                      </Row>
                      <Row>
                        <Accordion.Toggle
                          as={Button}
                          block
                          variant="link"
                          eventKey="0"
                        >
                          View {this.state.uploadedBeforeImages.length} Uploaded Images...
                        </Accordion.Toggle>
                      </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {this.chunkArray(
                          this.getPageOfArray(
                            this.state.uploadedBeforeImages,
                            this.state.reviewUploadedBeforePage
                          ),
                          2
                        ).map((chunk) => {
                          return (
                            <Row>
                              {chunk.map((imageSource) => {
                                return (
                                  <Col>
                                    <Image
                                      src={imageSource}
                                      alt="chosen"
                                      thumbnail
                                      fluid
                                    />
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
                              hidden={this.state.reviewUploadedBeforePage === 0}
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedBeforePage:
                                      state.reviewUploadedBeforePage - 1,
                                  };
                                })
                              }
                              block>
                              &lt;Prev.
                            </Button>
                          </Col>
                          <Col>Page {this.state.reviewUploadedBeforePage+1}/{Math.ceil(this.state.uploadedBeforeImages.length/previewPageSize)}</Col>
                          <Col>
                            <Button
                              hidden={
                                this.state.reviewUploadedBeforePage >=
                                Math.ceil(this.state.uploadedBeforeImages.length/previewPageSize) - 1
                              }
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedBeforePage:
                                      state.reviewUploadedBeforePage + 1,
                                  };
                                })
                              }
                              block>
                              Next &gt;
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Row>
                        <Button
                          variant="warning"
                          size="lg"
                          onClick={() => {
                            this.selectFile("during");
                          }}
                          block
                        >
                          DURING
                          <FontAwesomeIcon
                            icon={faUpload}
                            size="2x"
                            className="float-right"
                          />
                        </Button>
                      </Row>
                      <Row>
                        <Accordion.Toggle
                          as={Button}
                          block
                          variant="link"
                          eventKey="1"
                        >
                          View {this.state.uploadedDuringImages.length} Uploaded Images...
                        </Accordion.Toggle>
                      </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {this.chunkArray(
                          this.getPageOfArray(
                            this.state.uploadedDuringImages,
                            this.state.reviewUploadedDuringPage
                          ),
                          2
                        ).map((chunk) => {
                          return (
                            <Row>
                              {chunk.map((imageSource) => {
                                return (
                                  <Col>
                                    <Image
                                      src={imageSource}
                                      alt="chosen"
                                      thumbnail
                                      fluid
                                    />
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
                              hidden={this.state.reviewUploadedDuringPage === 0}
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedDuringPage:
                                      state.reviewUploadedDuringPage - 1,
                                  };
                                })}
                              block >
                              &lt;Prev.
                            </Button>
                          </Col>
                          <Col>Page {this.state.reviewUploadedDuringPage+1}/{Math.ceil(this.state.uploadedDuringImages.length/previewPageSize)}</Col>
                          <Col>
                            <Button
                              hidden={
                                this.state.reviewUploadedDuringPage >=
                                Math.ceil(this.state.uploadedDuringImages.length/previewPageSize) - 1
                              }
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedDuringPage:
                                      state.reviewUploadedDuringPage + 1,
                                  };
                                })
                              }
                              block
                            >
                              Next &gt;
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Row>
                        <Button
                          variant="success"
                          size="lg"
                          onClick={() => {
                            this.selectFile("after");
                          }}
                          block
                        >
                          AFTER
                          <FontAwesomeIcon
                            icon={faUpload}
                            size="2x"
                            className="float-right"
                          />
                        </Button>
                      </Row>
                      <Row>
                        <Accordion.Toggle
                          as={Button}
                          block
                          variant="link"
                          eventKey="2"
                        >
                          View {this.state.uploadedAfterImages.length} Uploaded Images...
                        </Accordion.Toggle>
                      </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        {this.chunkArray(
                          this.getPageOfArray(
                            this.state.uploadedAfterImages,
                            this.state.reviewUploadedAfterPage
                          ),
                          2
                        ).map((chunk) => {
                          return (
                            <Row>
                              {chunk.map((imageSource) => {
                                return (
                                  <Col>
                                    <Image
                                      src={imageSource}
                                      alt="chosen"
                                      thumbnail
                                      fluid
                                    />
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
                              hidden={this.state.reviewUploadedAfterPage === 0}
                              block
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedAfterPage:
                                      state.reviewUploadedAfterPage - 1,
                                  };
                                })
                              }
                            >
                              &lt;Prev.
                            </Button>
                          </Col>
                          <Col>Page {this.state.reviewUploadedAfterPage+1}/{Math.ceil(this.state.uploadedAfterImages.length/previewPageSize)}</Col>
                          <Col>
                            <Button
                              hidden={
                                this.state.reviewUploadedAfterPage >=
                                Math.ceil(this.state.uploadedAfterImages.length/previewPageSize)-1
                              }
                              onClick={() =>
                                this.setState((state, props) => {
                                  return {
                                    reviewUploadedAfterPage:
                                      state.reviewUploadedAfterPage + 1,
                                  };
                                })
                              }
                              block
                            >
                              Next &gt;
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="preview">
              <Container>
                <Row>
                  <br />
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={() => {
                        this.uploadFormRef.dispatchEvent(new Event("submit"));
                      }}
                      variant="success"
                      block
                      disabled={this.state.isUploading}
                    >
                      Submit Photos
                      <FontAwesomeIcon
                        className="float-right"
                        icon={faPaperPlane}
                        size="lg"
                      />{" "}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ProgressBar
                      now={this.state.progress}
                      label={`${this.state.progress}%`}
                    />
                  </Col>
                </Row>
                <Row>
                  <br />
                </Row>
                <Row>
                  <Col>
                    <h4>
                      You have selected {this.state.previewSources.length}{" "}
                      files.
                    </h4>
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
                    Do not close this tab until the upload is complete. You can
                    safely open other apps. (maybe... we should test this){" "}
                  </Col>
                </Row>
                <Row>
                  <br />
                </Row>
                <Row>
                  <br />
                </Row>
                <Row>
                  <br />
                </Row>
              </Container>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </>
    );
  }
}

export default Photoscreen;
