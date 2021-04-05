import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toggleEdit, deletePost } from './actions';
import PostForm from './PostForm';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import './BlogPost.css';
import { fetchPost } from './actionCreators';

const BlogPost = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);

  const post = useSelector(store => store.blogPostsFull);
  const editing = useSelector(store => store.editing);

  const handleEditClick = () => dispatch(toggleEdit());
  const deleteBlogPost = () => {
    dispatch(deletePost(postId));
    history.push("/");
  }

  if (editing) {
    return <PostForm post={post} postId={postId} />;
  }

  if (Object.keys(post).length === 0) {
    return <h1>Loading...</h1>;
  }

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
      {post.comments.map(c => (
        <Comment key={c.id} commentId={c.id} text={c.text} postId={postId} />
      ))}
      <AddCommentForm postId={postId} />
    </div>
  )
}

export default BlogPost;