import React from "react";
import { calculatePercent } from "../helper/calculations";

const ProgressBar = ({
  taskCount: { totalTasks, tasksInProgress, tasksToDo, tasksDone },
}) => {
  return (
    <div className="col-md-12">
      <div className="card h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">
            Total tasks: {totalTasks}
          </h6>
          <small>To Do ({tasksToDo})</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-dark"
              style={{
                width: calculatePercent(totalTasks, tasksToDo),
              }}
            />
          </div>
          <small>In Progress ({tasksInProgress})</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-dark"
              style={{
                width: calculatePercent(totalTasks, tasksInProgress),
              }}
            />
          </div>
          <small>Done ({tasksDone})</small>
          <div className="progress mb-3" style={{ height: "5px" }}>
            <div
              className="progress-bar bg-dark"
              style={{
                width: calculatePercent(totalTasks, tasksDone),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
