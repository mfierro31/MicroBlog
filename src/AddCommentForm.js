import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from './actions';

const AddCommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleChange = evt => {
    const value = evt.target.value;
    setText(value);
  }

  const createComment = () => dispatch(addComment(postId, text));

  const handleSubmit = evt => {
    evt.preventDefault();
    createComment();
    setText("");
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="New comment" value={text} onChange={handleChange} />
      </div>
      <button className="btn btn-primary">Add</button>
    </form>
  )
}

export default AddCommentForm;