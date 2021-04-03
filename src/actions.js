import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, TOGGLE_EDIT } from './actionTypes';

export const addPost = post => ({ type: ADD_POST, post });
export const editPost = (postId, editedPost) => ({ type: EDIT_POST, postId, editedPost });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const addComment = (postId, text) => ({ type: ADD_COMMENT, postId, text });
export const deleteComment = (postId, commentId) => ({ type: DELETE_COMMENT, postId, commentId });
export const toggleEdit = () => ({ type: TOGGLE_EDIT });