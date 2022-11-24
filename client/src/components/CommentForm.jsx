import React from "react";

const CommentForm = () => {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-12">
        <h5 className="comment-title">Leave a Comment</h5>
        <div className="row">
          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              id="comment-message"
              placeholder="Write a comment..."
              cols="4"
              rows="4"
            ></textarea>
          </div>
          <div className="col-12">
            <input
              type="submit"
              className="btn btn-primary"
              value="Post comment"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
