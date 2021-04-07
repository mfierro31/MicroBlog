import axios from 'axios';
import { 
  ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, GET_POST, GET_POSTS, VOTE_MIN, VOTE_FULL
} from './actionTypes';

const API_URL = "http://localhost:5000/api/posts";

function gotPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  };
}

function gotPost(post) {
  return {
    type: GET_POST,
    post
  };
}

function deletedPost(postId) {
  return {
    type: DELETE_POST,
    postId
  };
}

function editedPost(postId, editedPost) {
  return {
    type: EDIT_POST,
    postId,
    editedPost
  };
}

function createdPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

function createdComment(postId, newComment) {
  return {
    type: ADD_COMMENT,
    postId,
    newComment
  };
}

function deletedComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  };
}

function gotMinVotes(postId, votes) {
  return {
    type: VOTE_MIN,
    postId,
    votes
  };
}

function gotFullVotes(postId, votes) {
  return {
    type: VOTE_FULL,
    postId,
    votes
  };
}

export function fetchPosts() {
  return async function(dispatch) {
    const { data } = await axios.get(API_URL);
    dispatch(gotPosts(data));
  }
}

export function fetchPost(postId) {
  return async function(dispatch) {
    const { data } = await axios.get(`${API_URL}/${postId}`);
    dispatch(gotPost(data));    
  }
}

export function deletePost(postId) {
  return async function(dispatch) {
    await axios.delete(`${API_URL}/${postId}`);
    dispatch(deletedPost(postId));
  }
}

export function editPost(postId, modifiedPost) {
  return async function(dispatch) {
    const res = await axios.put(`${API_URL}/${postId}`, modifiedPost);
    dispatch(editedPost(postId, res.data));
  }
}

export function addPost(newPost) {
  return async function(dispatch) {
    const res = await axios.post(API_URL, newPost);
    dispatch(createdPost(res.data));
  }
}

export function addComment(postId, text) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}/${postId}/comments`, { text });
    dispatch(createdComment(postId, res.data));
  }
}

export function deleteComment(postId, commentId) {
  return async function(dispatch) {
    await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
    dispatch(deletedComment(postId, commentId));
  }
}

export function voteMin(postId, direction) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}/${postId}/vote/${direction}`);
    dispatch(gotMinVotes(postId, res.data.votes));
  }
}

export function voteFull(postId, direction) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}/${postId}/vote/${direction}`);
    dispatch(gotFullVotes(postId, res.data.votes));
  }
}