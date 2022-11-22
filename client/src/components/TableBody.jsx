import { MDBBadge, MDBTableBody } from "mdb-react-ui-kit";
import React from "react";
import dayjs from "dayjs";
import Avatar from "./Avatar";
import { getStatusColor } from "../helper/getStatusColor";
import { truncateString } from "../helper/truncateString";

const TableBody = ({
  createdBy,
  status,
  assignTo,
  category,
  title,
  description,
  date,
  id,
}) => {
  return (
    <MDBTableBody key={id}>
      <tr>
        <td>
          <div className="d-flex align-items-center">
            <Avatar name={createdBy.name} src={createdBy.profilePic} />
            <div className="ms-3">
              <p className="fw-bold mb-1">{createdBy.name}</p>
              <p className="text-muted mb-0">{createdBy.email}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{title}</p>
          <p className="text-muted mb-0">{truncateString(description, 15)}</p>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <Avatar name={assignTo.name} src={assignTo.profilePic} />
            <div className="ms-3">
              <p className="fw-bold mb-1">{assignTo.name}</p>
              <p className="text-muted mb-0">{assignTo.email}</p>
            </div>
          </div>
        </td>
        <td>
          <MDBBadge color={getStatusColor(status.toLowerCase())} pill>
            {status}
          </MDBBadge>
        </td>
        <td>{category}</td>
        <td>{dayjs(date).format("DD/MM/YYYY")}</td>
      </tr>
    </MDBTableBody>
  );
};

export default TableBody;
