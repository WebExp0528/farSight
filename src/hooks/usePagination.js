import React from 'react';

export const usePagination = (total, defaultSize = 10, defaultPage = 1) => {
  const [currentPage, setCurrentPage] = React.useState(defaultPage);
  const totalPage = Math.floor(total / defaultSize) + 1;

  const setFirstPage = () => {
    setCurrentPage(1);
  };
  const setLastPage = () => {
    setCurrentPage(totalPage);
  };

  const setNextPage = () => {
    if (currentPage < total) setCurrentPage(currentPage + 1);
  };

  const setPrevPage = () => {
    if (currentPage > total) setCurrentPage(currentPage - 1);
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
    setPage
  };
};
