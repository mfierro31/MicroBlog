import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deletePost } from '../actions/actionCreators';
import PostForm from './PostForm';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import './BlogPost.css';
import { fetchPost, voteFull } from '../actions/actionCreators';

const BlogPost = () => {
  const postId = Number(useParams().postId);
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const post = useSelector(store => store.blogPostsFull[postId]);

  useEffect(() => {
    // only runs if the post we're trying to view isn't in the blogPostsFull state yet
    function getPost() {
      dispatch(fetchPost(postId));
    }

    if (!post) {
      getPost();
    }
  }, [dispatch, postId, post]);

  const handleEditClick = () => setEditing(!editing);

  const deleteBlogPost = () => {
    dispatch(deletePost(postId));
    history.push("/");
  }

  const votePost = direction => {
    dispatch(voteFull(postId, direction));
  }

  if (!post) {
    return <h1>Loading...</h1>;
  }

  if (editing) {
    return <PostForm post={post} toggleEdit={handleEditClick} postId={postId} edit={editing} />;
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
      <div>
        <b className="mr-3">{post.votes} {post.votes === 1 ? "vote" : "votes"}</b>
        <i className="fas fa-thumbs-up text-success mr-3" onClick={() => votePost('up')} />
        <i className="fas fa-thumbs-down text-danger" onClick={() => votePost('down')} />
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