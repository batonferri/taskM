import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import TaskBody from "../components/TaskBody";
import TaskWidgetBody from "../components/TaskWidgetBody";
import TaskWidgetButton from "../components/TaskWidgetButton";
import { useQuery } from "../hooks/useFetch";

const Task = () => {
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();

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
        <div className="col-md-3 my-4">
          <TaskWidgetBody
            status={task.status}
            createdBy={{
              name: task.createdBy,
              profilePic: task.createdBy_profile_pic,
            }}
            assignTo={{
              name: task.assignTo,
              profilePic: task.assignTo_profile_pic,
            }}
            createdAt={task.created_at}
            startedAt={task.started_at}
            finishedAt={task.finished_at}
            priority={task.priority}
            deadline={task.deadline}
          />
          <TaskWidgetButton
            assignTo={task.assignTo_id}
            id={id}
            createdBy={task.createdBy_id}
            status={task.status}
            setRefetch={setRefetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
