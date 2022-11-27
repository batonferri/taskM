import React from "react";
import { MDBBadge, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import { getStatusColor } from "../helper/getStatusColor";
import Avatar from "./Avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const TaskWidgetBody = ({
  status,
  createdBy,
  assignTo,
  createdAt,
  priority,
  deadline,
  startedAt,
  finishedAt,
}) => {
  dayjs.extend(relativeTime);

  return (
    <div className="aside-block my-2">
      <MDBCard>
        <MDBCardBody>
          <MDBCardText>
            Created on {dayjs(createdAt).format("MMMM D, YYYY")}
          </MDBCardText>
          <MDBCardText>
            Status:
            <MDBBadge
              className="ms-2"
              color={getStatusColor(status.toLowerCase())}
              pill
            >
              {status}
            </MDBBadge>
          </MDBCardText>
          <MDBCardText>
            <div className="d-flex align-items-center">
              Created By:
              <Link
                to={`/profile/${createdBy.id}`}
                className="d-flex align-items-center text-dark"
              >
                <Avatar
                  name={createdBy.name}
                  src={createdBy.profilePic}
                  width="30px"
                  height="30px"
                  className="ms-2"
                />
                <p className="fw-bold mb-1 ms-2">{createdBy.name}</p>
              </Link>
            </div>
          </MDBCardText>
          <MDBCardText>
            <div className="d-flex align-items-center">
              Assign To:
              <Link
                to={`/profile/${assignTo.id}`}
                className="d-flex align-items-center text-dark"
              >
                <Avatar
                  name={assignTo.name}
                  src={assignTo.profilePic}
                  width="30px"
                  height="30px"
                  className="ms-2"
                />
                <p className="fw-bold mb-1 ms-2">{assignTo.name}</p>
              </Link>
            </div>
          </MDBCardText>
          {finishedAt && (
            <MDBCardText>
              Finished: {dayjs(finishedAt).fromNow(true)} ago
            </MDBCardText>
          )}
          {startedAt && !finishedAt && (
            <MDBCardText>
              Started: {dayjs(startedAt).fromNow(true)} ago
            </MDBCardText>
          )}
          <MDBCardText>
            Priority:
            <MDBBadge
              className="ms-2"
              color={getStatusColor(priority.toLowerCase())}
            >
              {priority}
            </MDBBadge>
          </MDBCardText>
          <MDBCardText>
            Estimated:{" "}
            {dayjs(deadline).diff(dayjs(createdAt).format("YYYY-MM-DD"), "d")}{" "}
            days
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default TaskWidgetBody;
