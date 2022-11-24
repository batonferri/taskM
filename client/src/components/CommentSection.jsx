import React from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Error from "./Error";
import { useQuery } from "../hooks/useFetch";

const CommentSection = ({ taskId }) => {
  const { data: comments, loading, error } = useQuery(`/comments/${taskId}`);

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      {comments.length ? (
        <Comments comments={comments} />
      ) : (
        <h5 className="mt-5">There is no comments on this task</h5>
      )}
      <CommentForm />
    </>
  );
};

export default CommentSection;
