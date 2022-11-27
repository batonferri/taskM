import React from "react";

const ProgressBar = () => {
  return (
    <div className="col-md-12">
      <div className="card h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">Progress</h6>
          <small>To Do</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: "80%" }}
              aria-valuenow="80"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small>In Progress</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: "72%" }}
              aria-valuenow="72"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small>Done</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: "89%" }}
              aria-valuenow="89"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
