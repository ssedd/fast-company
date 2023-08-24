import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comment/addCommentForm";
import CommentsList from "../common/comment/commentsList";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComments = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id));
    });
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
