import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import { Pagination } from 'components';
import { readFile } from 'helpers/readFile';

const Default_Size = 10;

const PreviewImages = props => {
  const { data: imageData, type = 'url' } = props;
  const [previewImages, setPreviewImages] = React.useState([]);
  console.log('~~~~~ preview Images', previewImages);

  const handleChangePage = pagination => {
    const sliceIndex = Default_Size * pagination.currentPage;

    if (type === 'url') {
      setPreviewImages(imageData.slice(sliceIndex - 10, sliceIndex));
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
      imageData.slice(sliceIndex - 10, sliceIndex).map((file, index) => {
        readFile(file).then(result => {
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
