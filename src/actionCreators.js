import axios from 'axios';

const POSTS_URL = "http://localhost:5000/api/posts";

function gotPosts(posts) {
  return {
    type: "GET_POSTS",
    posts
  };
}

function gotPost(post) {
  return {
    type: "GET_POST",
    post
  };
}

function deletedPost(postId) {
  return {
    type: "DELETE_POST",
    postId
  };
}

export function fetchPosts() {
  return async function(dispatch) {
    const { data } = await axios.get(POSTS_URL);
    dispatch(gotPosts(data));
  }
}

export function fetchPost(postId) {
  return async function(dispatch) {
    const { data } = await axios.get(`${POSTS_URL}/${postId}`);
    dispatch(gotPost(data));
  }
}

export function deletePost(postId) {
  return async function(dispatch) {
    await axios.delete(`${POSTS_URL}/${postId}`);
    dispatch(deletedPost(postId));
  }
}