import React, { useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import EditFormContext from './contexts/editFormContext';
import BlogContext from './contexts/blogContext';
import PostForm from './PostForm';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import './BlogPost.css';

const BlogPost = () => {
  const { postId } = useParams();
  const { deletePost, blogPosts: posts } = useContext(BlogContext);

  const [editing, setEditing] = useState(false);

  const post = posts.find(p => p.id === postId);

  const handleEditClick = () => {
    setEditing(!editing);
  }

  if (post === undefined) {
    return <Redirect to="/" />
  } else if (editing) {
    return (
      <EditFormContext.Provider value={{ editing, handleEditClick, post, postId }}>
        <PostForm edit={true} />
      </EditFormContext.Provider>
    )
  } else {
    return (
      <div>
        <h1 className="mb-3">{post.title}</h1>
        <p><i>{post.description}</i></p>
        <p>{post.body}</p>
        <div className="mt-3 mb-5">
          <button onClick={handleEditClick} className="btn btn-primary mr-3">Edit</button>
          <button onClick={() => deletePost(postId)} className="btn btn-danger">Delete</button>
        </div>
        <hr className="BlogPost-hr" />
        <h3 className="my-5">Comments</h3>
        {post.comments.map(c => <Comment key={c.id} commentId={c.id} text={c.text} postId={postId} />)}
        <AddCommentForm postId={postId} />
      </div>
    )
  }
}

export default BlogPost;