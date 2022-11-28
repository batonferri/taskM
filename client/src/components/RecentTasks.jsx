import dayjs from "dayjs";
import { MDBBadge, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../helper/getStatusColor";
import { truncateString } from "../helper/truncateString";

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-12">
      <div className="card h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">Recent Tasks:</h6>
          <MDBTable align="middle">
            {tasks.map((task) => (
              <MDBTableBody
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/task/${task.taskId}`)}
                className="lightHoverEffectRow"
              >
                <tr>
                  <td>
                    <p className="fw-normal mb-1">
                      {truncateString(task.title, 40)}
                    </p>
                  </td>
                  <td>{dayjs(task.created_at).format("DD/MM/YYYY")}</td>
                  <td>
                    <MDBBadge
                      color={getStatusColor(task.status.toLowerCase())}
                      pill
                    >
                      {task.status}
                    </MDBBadge>
                  </td>
                  <td>{task.category}</td>
                </tr>
              </MDBTableBody>
            ))}
          </MDBTable>
        </div>
      </div>
    </div>
  );
};

export default RecentTasks;
