import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import React from "react";
import { useMultipleQueryParams } from "../hooks/useMultipleQueryParams";
import PaginationNumbers from "./PaginationNumbers";

const Pagination = ({ totalPages }) => {
  const { handleChange, page, setPage } = useMultipleQueryParams();

  return (
    <nav aria-label="Page navigation example">
      <MDBPagination className="mb-0 justify-content-end">
        <MDBPaginationItem>
          <MDBPaginationLink
            type="button"
            style={{ pointerEvents: page === 1 && "none" }}
            onClick={() => {
              handleChange({ target: { name: "page", value: page - 1 } });
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
          handleChange={handleChange}
        />
        <MDBPaginationItem>
          <MDBPaginationLink
            type="button"
            style={{ pointerEvents: page >= totalPages && "none" }}
            onClick={() => {
              handleChange({ target: { name: "page", value: page + 1 } });
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
