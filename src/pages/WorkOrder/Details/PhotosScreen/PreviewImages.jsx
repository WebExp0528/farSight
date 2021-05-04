import React from 'react';
import { Row } from 'react-bootstrap';

import { Pagination } from 'components';

const Default_Size = 10;

const PreviewImages = props => {
  const { data: imageData, type = 'url' } = props;
  const [previewImages, setPreviewImages] = React.useState([]);

  const handleChangePage = pagination => {
    const sliceIndex = Default_Size * pagination.currentPage;
    setPreviewImages(imageData.slice(sliceIndex - 10, sliceIndex));
    return;
  };

  return (
    <div className="">
      {/* {data.slice().map((chunk, index) => {
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
            } ) } */}
      <Pagination totalItems={imageData.length} onChange={handleChangePage} defaultSize={Default_Size} />
    </div>
  );
};

export default PreviewImages;
