import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import EditFormContext from './contexts/editFormContext';
import BlogContext from './contexts/blogContext';
import './PostForm.css';

const PostForm = ({ edit }) => {
  const history = useHistory();

  let post;
  let postId;
  let editing;
  let handleEditClick;
  let addPost;
  let editPost;

  const editingContext = useContext(EditFormContext);
  const postContext = useContext(BlogContext);

  if (edit) {
    post = editingContext.post;
    postId = editingContext.postId;
    editing = editingContext.editing;
    handleEditClick = editingContext.handleEditClick;
    editPost = postContext.editBlogPost;
  } else {
    addPost = postContext.addBlogPost;
  }

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

  const handleSubmit = evt => {
    evt.preventDefault();

    if (edit) {
      editPost(formData, postId);
      handleEditClick()
      history.push(`/${postId}`);
    } else {
      addPost(formData);
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
        {edit ? <button onClick={handleEditClick} className="btn btn-secondary">Cancel</button> : 
        <Link to="/" className="btn btn-secondary">Cancel</Link>}
      </form>
    </div>
  )
}

export default PostForm;