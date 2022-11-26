import React from "react";

const TaskBody = ({ title, description }) => {
  return (
    <div className="mb-5">
      <h1 className="my-3" style={{ color: "#332d2d" }}>
        {title}
      </h1>
      <p>{description}</p>
    </div>
  );
};

export default TaskBody;
