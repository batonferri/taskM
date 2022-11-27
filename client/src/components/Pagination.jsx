import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import React from "react";
import { useMultipleQueryParams } from "../hooks/useMultipleQueryParams";
import PaginationNumbers from "./PaginationNumbers";

const Pagination = ({ totalPages }) => {
  const { setParams, page, setPage } = useMultipleQueryParams();

  return (
    <nav aria-label="Page navigation example">
      <MDBPagination className="mb-0 justify-content-end">
        <MDBPaginationItem>
          <MDBPaginationLink
            type="button"
            style={{ pointerEvents: page === 1 && "none" }}
            onClick={() => {
              setParams((prev) => ({ ...prev, page: page - 1 }));
              setPage((prev) => prev - 1);
            }}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        <PaginationNumbers
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
        <MDBPaginationItem>
          <MDBPaginationLink
            type="button"
            style={{ pointerEvents: page >= totalPages && "none" }}
            onClick={() => {
              setParams((prev) => ({ ...prev, page: page + 1 }));
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
};

export default Pagination;
