import React from "react";

const Pagination = ({ productsData, page, setPage, maxVisiblePages = 10 }) => {
  console.log(productsData.length);

  const totalPages = Math.ceil(productsData?.length / 10);

  const selectPageHadler = (pageNo) => {
    setPage(pageNo);
  };

  const renderPageKey = (currentPage, i) => {
    return (
      <span
        key={i}
        className={page === currentPage ? "pagination__selected" : ""}
        onClick={() => selectPageHadler(currentPage)}
      >
        {currentPage}
      </span>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i, i));
      }
    } else {
      // truncation logic
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        if (startPage > 2) {
          pageNumbers.push(renderPageKey(1, 1));
        }
        pageNumbers.push(renderPageKey("....", "ellipsis-start"));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageKey(i));
      }

      if (endPage < totalPages) {
        pageNumbers.push(renderPageKey("....", "ellipsis-end"));
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderPageKey(totalPages));
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <span
        className={page > 1 ? "" : "pagination__disabled"}
        onClick={() => selectPageHadler(page === 1 ? 10 : page - 1)}
      >
        ◀️
      </span>
      {renderPageNumbers()}
      <span
        className={page < totalPages ? "" : "pagination__disabled"}
        onClick={() => selectPageHadler((page + 1) % 10)}
      >
        ▶️
      </span>
    </div>
  );
};

export default Pagination;
