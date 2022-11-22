import { MDBTableHead } from "mdb-react-ui-kit";
import React from "react";

const TableHead = ({ tableColumns }) => {
  return (
    <MDBTableHead>
      <tr>
        {tableColumns.map((tableColumn, i) => (
          <th scope="col" key={i}>
            {tableColumn}
          </th>
        ))}
      </tr>
    </MDBTableHead>
  );
};

export default TableHead;
