import React from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comment/addCommentForm";
import CommentsList from "../common/comment/commentsList";
import { UseComments } from "../../hooks/useComments";

const Comments = () => {
  const { createComment, comments, removeComment } = UseComments();

  const handleSubmit = (data) => {
    createComment(data);
    // api.comments
    //   .add({ ...data, pageId: userId,  })
    //   .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComments = (id) => {
    removeComment(id);
    // api.comments.remove(id).then((id) => {
    //   setComments(comments.filter((x) => x._id !== id));
    // });
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <CommentsList
            comments={sortedComments}
            onRemove={handleRemoveComments}
          />
          <hr />
        </div>
      </div>
    </>
  );
};

export default Comments;
