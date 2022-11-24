import axios from "axios";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Error from "./Error";
import { useQuery } from "../hooks/useFetch";

const CommentSection = ({ taskId }) => {
  const [message, setMessage] = useState("");
  const [refetch, setRefetch] = useState(false);

  const {
    data: comments,
    loading,
    error,
  } = useQuery(`/comments/${taskId}`, refetch);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comments/${taskId}`, { message });
      setMessage("");
      setRefetch((prevState) => !prevState);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("test");

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
      <CommentForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        message={message}
      />
    </>
  );
};

export default CommentSection;
