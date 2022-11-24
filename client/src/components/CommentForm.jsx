import React from "react";

const CommentForm = ({ handleChange, handleSubmit, message }) => {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-12">
        <h5 className="comment-title">Leave a Comment</h5>
        <div className="row">
          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              name="message"
              value={message}
              placeholder="Write a comment..."
              cols="4"
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12">
            <input
              onClick={handleSubmit}
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
