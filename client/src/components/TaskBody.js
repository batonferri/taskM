import React from "react";

const TaskBody = ({ title, description }) => {
  return (
    <div className="col-md-9">
      <div>
        <h1 className="mb-5">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TaskBody;
