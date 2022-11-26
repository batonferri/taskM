import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import TaskBody from "../components/TaskBody";
import TaskSidebar from "../components/TaskSidebar";
import { useQuery } from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

const Task = () => {
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();
  const { me } = useUser();

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/start/${id}`);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/close/${id}`);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const { data: task, loading, error } = useQuery(`/tasks/${id}`, refetch);

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <TaskBody title={task.title} description={task.description} />
          <CommentSection taskId={id} />
        </div>
        <div className="col-md-3">
          {task.assignTo_id === me.id && task.status === "To Do" && (
            <TaskSidebar
              onClick={handleStart}
              btnText="start"
              title="Start this task"
              message={`By clicking start task status will change from "To Do" to "In
            Progress"`}
            />
          )}
          {task.createdBy_id === me.id && task.status === "In Progress" && (
            <TaskSidebar
              onClick={handleClose}
              btnText="Close"
              title="Close this task"
              message={`By clicking close task status will change from "In
              Progress" to "Done"`}
            />
          )}
          {task.createdBy_id === me.id && task.status === "Done" && (
            <TaskSidebar
              onClick={handleClose}
              btnText="ReOpen"
              title="Reopen this task"
              message={`This task was marked as "Done" on ${dayjs(
                task.finished_at
              ).format(
                "DD/MM/YYYY"
              )}. You can reopen it by clicking button below`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
