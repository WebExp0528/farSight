import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import { Pagination } from 'components';
import { readFile } from 'helpers/readFile';

const Default_Size = 10;

const PreviewImages = props => {
  const { data: imageData, type = 'url' } = props;
  const [previewImages, setPreviewImages] = React.useState([]);

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

  return (
    <div className="">
      <Row>
        {previewImages.map((file, index) => {
          return (
            <Col key={index}>
              <Image src={type === 'url' ? file : file.data} alt="chosen" thumbnail fluid />
            </Col>
          );
        })}
      </Row>
      <Pagination totalItems={imageData.length} onChange={handleChangePage} defaultSize={Default_Size} />
    </div>
  );
};

export default PreviewImages;
