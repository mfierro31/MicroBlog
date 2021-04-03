import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from './actionTypes';

export const addPost = post => ({ type: ADD_POST, post });
export const editPost = (postId, editedPost) => ({ type: EDIT_POST, postId, editedPost });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const addComment = postId => ({ type: ADD_COMMENT, postId });
export const deleteComment = (postId, commentId) => ({ type: DELETE_COMMENT, postId, commentId });