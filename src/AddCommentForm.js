import React, { useState, useContext } from 'react';
import BlogContext from './contexts/blogContext';

const AddCommentForm = ({ postId }) => {
  const { addComment } = useContext(BlogContext);

  const [text, setText] = useState("");

  const handleChange = evt => {
    const value = evt.target.value;
    setText(value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addComment(postId, text);
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