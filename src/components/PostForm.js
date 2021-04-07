import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { editPost, addPost } from '../actions/actionCreators';
import './PostForm.css';

const PostForm = ({ post, edit, toggleEdit, postId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const INITIAL_STATE = {
    title: post ? post.title : "",
    description: post ? post.description : "",
    body: post ? post.body : ""
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  const editBlogPost = () => dispatch(editPost(postId, formData));
  const createPost = () => dispatch(addPost(formData));

  const handleSubmit = evt => {
    evt.preventDefault();

    if (edit) {
      editBlogPost();
      toggleEdit();
      history.push(`/${postId}`);
    } else {
      createPost();
      history.push("/");
    }
  }

  return (
    <div>
      <h1>{edit ? "Edit" : "Add"} Post</h1>
      <form onSubmit={handleSubmit} className="AddPostForm-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input 
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input 
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="text"
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body:</label>
          <textarea 
            className="form-control"
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="15"
            required
          ></textarea>
        </div>
        <button className="btn btn-primary mr-3">{edit ? "Edit" : "Add"}</button>
        {edit ? <button onClick={toggleEdit} className="btn btn-secondary">Cancel</button> : 
        <Link to="/" className="btn btn-secondary">Cancel</Link>}
      </form>
    </div>
  )
}

export default PostForm;