import { MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
import React from "react";
import { useMultipleQueryParams } from "../hooks/useMultipleQueryParams";

const PaginationNumbers = ({ page, setPage, totalPages }) => {
  const pageNumberShown = [page - 1, page, page + 1];

  const { setParams } = useMultipleQueryParams();

  return pageNumberShown
    .filter((pageNr) => pageNr > 0 && pageNr <= totalPages)
    .map((pageNr) => (
      <MDBPaginationItem>
        <MDBPaginationLink
          type="button"
          style={{
            pointerEvents: page === pageNr && "none",
            backgroundColor: page === pageNr && "#eeeeee",
          }}
          onClick={() => {
            setParams((prev) => ({ ...prev, page: pageNr }));
            setPage(pageNr);
          }}
        >
          {pageNr}
        </MDBPaginationLink>
      </MDBPaginationItem>
    ));
};

export default PaginationNumbers;
