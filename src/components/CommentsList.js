import React from "react";

function Comments({ comments }) {
  return (
    <div className="container">
      {comments.map((comment) => {
        return <p>{comment.body}</p>;
      })}
    </div>
  );
}

export default Comments;