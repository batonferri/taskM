import React from "react";

const TaskBody = ({ title, description }) => {
  return (
    <div>
      <h1 className="mb-5">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default TaskBody;
