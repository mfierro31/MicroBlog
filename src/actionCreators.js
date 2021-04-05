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