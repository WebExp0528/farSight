import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import { Pagination } from 'components';
import { readFileAsBase64 } from 'helpers/readFile';

const Default_Size = 12;

const PreviewImages = props => {
  const { data: imageData, type = 'url' } = props;
  const [previewImages, setPreviewImages] = React.useState([]);

  const handleChangePage = page => {
    const sliceIndex = Default_Size * page;

    if (type === 'url') {
      setPreviewImages(imageData.slice(sliceIndex - Default_Size, sliceIndex));
    } else {
      setPreviewImages(
        Array(Default_Size)
          .fill(null)
          .map(() => {
            return {
              data: null,
              isLoading: true
            };
          })
      );
      imageData.slice(sliceIndex - Default_Size, sliceIndex).map((file, index) => {
        readFileAsBase64(file).then(result => {
          let tmp = [...previewImages];
          tmp[index] = {
            data: result.result,
            isLoading: false
          };
          setPreviewImages(tmp);
        });
      });
    }
    return;
  };

  if (!imageData.length) {
    return null;
  }

  return (
    <div className="p-2">
      <Row>
        {previewImages.map((file, index) => {
          return (
            <Col key={index} xs={4}>
              <Image src={type === 'url' ? file['image_url_full'] : file.data} alt="chosen" thumbnail fluid />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="pt-2" sm={12}>
          <Pagination
            className="justify-content-center"
            totalItems={imageData.length}
            onChange={handleChangePage}
            defaultSize={Default_Size}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PreviewImages;
