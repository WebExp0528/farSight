import React from 'react';

let totalPage = 1;

/**
 * Pagination Hook
 *
 * @param {number} total
 * @param {number} defaultSize
 * @param {number} defaultPage
 *
 * @returns
 */
export const usePagination = (total, defaultSize = 10, defaultPage = 1) => {
  const [currentPage, setCurrentPage] = React.useState(defaultPage);
  totalPage = Math.floor(total / defaultSize) + (total % defaultSize ? 1 : 0);
  totalPage = totalPage === 0 ? 1 : totalPage;

  const setFirstPage = () => {
    setCurrentPage(1);
  };
  const setLastPage = () => {
    setCurrentPage(totalPage);
  };

  const setNextPage = () => {
    setCurrentPage(oldCurrentPage => (oldCurrentPage < totalPage ? oldCurrentPage + 1 : oldCurrentPage));
  };

  const setPrevPage = () => {
    setCurrentPage(oldCurrentPage => (oldCurrentPage > 1 ? oldCurrentPage - 1 : oldCurrentPage));
  };

  const setPage = number => {
    if (number >= 1 && number <= totalPage) {
      setCurrentPage(number);
    }
  };

  return {
    total,
    totalPage,
    currentPage,
    setNextPage,
    setPrevPage,
    setLastPage,
    setFirstPage,
    setPage,
    countPerPage: defaultSize
  };
};
