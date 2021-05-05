import { usePagination } from 'hooks';
import React from 'react';
import { Pagination } from 'react-bootstrap';

/**
 * Pagination Component
 */
const CustomPagination = ({ totalItems, onChange, defaultSize = 10, defaultPage = 1 }) => {
  const pagination = usePagination(totalItems, defaultSize, defaultPage);

  React.useEffect(() => {
    onChange(pagination);
  }, [pagination]);

  let minPage = pagination.currentPage - 2;
  let maxPage = pagination.currentPage + 2;
  if (minPage < 1) {
    maxPage -= minPage - 1;
  }
  if (maxPage > pagination.totalPage) {
    minPage -= maxPage - pagination.totalPage;
  }
  minPage = minPage < 1 ? 1 : minPage;
  maxPage = maxPage > pagination.totalPage ? pagination.totalPage : maxPage;

  return (
    <Pagination size="sm">
      <Pagination.First onClick={pagination.setFirstPage} />
      <Pagination.Prev onClick={pagination.setPrevPage} />
      {minPage > 1 && <Pagination.Ellipsis />}
      {Array(maxPage - minPage + 1)
        .fill(null)
        .map((_value, index) => {
          return (
            <Pagination.Item
              key={index}
              active={pagination.currentPage === minPage + index}
              onClick={() => pagination.setPage(minPage + index)}
            >
              {minPage + index}
            </Pagination.Item>
          );
        })}
      {maxPage < pagination.totalPage && <Pagination.Ellipsis />}
      <Pagination.Next onClick={pagination.setNextPage} />
      <Pagination.Last onClick={pagination.setLastPage} />
    </Pagination>
  );
};

export default CustomPagination;
