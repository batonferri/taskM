import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avatar from "./Avatar";

const Comments = ({ comments }) => {
  dayjs.extend(relativeTime);
  return (
    <div className="comments">
      <h5 className="comment-title py-4">
        {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
      </h5>

      {comments.map((comment) => (
        <div className="comment d-flex mb-4" key={comment.id}>
          <div className="flex-shrink-0">
            <Avatar name={comment.full_name} src={comment.profile_pic} />
          </div>

          <div className="flex-grow-1 ms-2 ms-sm-3">
            <div className="comment-meta d-flex align-items-baseline">
              <h6 className="me-2">{comment.full_name}</h6>
              <span className="text-muted">
                {dayjs(comment.created_at).fromNow(true)}
              </span>
            </div>
            <div className="comment-body">{comment.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
