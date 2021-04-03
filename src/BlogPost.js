import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { toggleEdit, deletePost } from './actions';
import PostForm from './PostForm';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import './BlogPost.css';

const BlogPost = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const posts = useSelector(store => store.blogPosts);
  const editing = useSelector(store => store.editing);

  const post = posts[postId];

  const handleEditClick = () => dispatch(toggleEdit());
  const deleteBlogPost = () => {
    dispatch(deletePost(postId));
    history.push("/");
  }

  if (post === undefined) {
    return <Redirect to="/" />
  } else if (editing) {
    return (
      <PostForm post={post} postId={postId} />
    )
  } else {
    return (
      <div>
        <h1 className="mb-3">{post.title}</h1>
        <p><i>{post.description}</i></p>
        <p>{post.body}</p>
        <div className="mt-3 mb-5">
          <button onClick={handleEditClick} className="btn btn-primary mr-3">Edit</button>
          <button onClick={deleteBlogPost} className="btn btn-danger">Delete</button>
        </div>
        <hr className="BlogPost-hr" />
        <h3 className="my-5">Comments</h3>
        {Object.keys(post.comments).map(key => (
          <Comment key={key} commentId={key} text={post.comments[key]} postId={postId} />
        ))}
        <AddCommentForm postId={postId} />
      </div>
    )
  }
}

export default BlogPost;