import { MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
import React from "react";

const PaginationNumbers = ({ page, setPage, totalPages, handleChange }) => {
  const pageNumberShown = [page - 1, page, page + 1];

  return pageNumberShown
    .filter((pageNr) => pageNr > 0 && pageNr <= Math.ceil(totalPages))
    .map((pageNr) => (
      <MDBPaginationItem>
        <MDBPaginationLink
          type="button"
          style={{
            pointerEvents: page === pageNr && "none",
            backgroundColor: page === pageNr && "#eeeeee",
          }}
          onClick={() => {
            handleChange({ target: { name: "page", value: pageNr } });
            setPage(pageNr);
          }}
        >
          {pageNr}
        </MDBPaginationLink>
      </MDBPaginationItem>
    ));
};

export default PaginationNumbers;
