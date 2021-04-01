import React, { useContext } from 'react';
import BlogContext from './contexts/blogContext';

const Comment = ({ commentId, postId, text }) => {
  const { deleteComment } = useContext(BlogContext);

  return (
    <p>
      <button onClick={() => deleteComment(postId, commentId)} className="btn btn-danger mr-3">X</button> {text}
    </p>
  )
}

export default Comment;