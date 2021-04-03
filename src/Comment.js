import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from './actions';

const Comment = ({ commentId, postId, text }) => {
  const dispatch = useDispatch();

  const eraseComment = () => dispatch(deleteComment(postId, commentId));

  return (
    <p>
      <button onClick={eraseComment} className="btn btn-danger mr-3">X</button> {text}
    </p>
  )
}

export default Comment;