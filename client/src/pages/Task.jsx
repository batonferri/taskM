import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TaskBody from "../components/TaskBody";
import TaskSidebar from "../components/TaskSidebar";
import { useQuery } from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

const Task = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  const { me } = useUser();

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/tasks/start/${id}`);
      setMessage(res);
    } catch (err) {
      console.log(err);
    }
  };

  const { data: task, loading, error } = useQuery(`/tasks/${id}`);

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container">
      <div className="row">
        <TaskBody title={task.title} description={task.description} />
        <div className="col-md-3">
          {task.assignTo_id === me.id && (
            <TaskSidebar handleStart={handleStart} message={message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
