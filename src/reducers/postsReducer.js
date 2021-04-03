import { v4 as uuid } from 'uuid';

const INITIAL_STATE = JSON.parse(window.localStorage.getItem('blogPosts')) || {};

function postsReducer(state = INITIAL_STATE, action) {  
  let stateCopy;
  let blogPost;

  switch(action.type) {
    case "ADD_POST":
      const newPostId = uuid();
      const newPost = { 
        ...action.post, 
        comments: {} 
      };
      const updatedState = { ...state, [newPostId]: newPost};

      window.localStorage.setItem('blogPosts', JSON.stringify(updatedState));
      return updatedState;
    case "EDIT_POST":
      stateCopy = { ...state };

      stateCopy[action.postId] = { ...stateCopy[action.postId], ...action.editedPost };

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy));
      return stateCopy;
    case "DELETE_POST":
      stateCopy = { ...state };
    
      delete stateCopy[action.postId];

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy));
      return stateCopy;
    case "ADD_COMMENT":
      stateCopy = { ...state };
      blogPost = stateCopy[action.postId];
      const commentId = uuid();

      blogPost.comments[commentId] = action.text;

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy));
      return stateCopy;
    case "DELETE_COMMENT":
      stateCopy = { ...state };
      blogPost = stateCopy[action.postId];

      delete blogPost.comments[action.commentId];

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy));
      return stateCopy;
    default:
      return state;
  }
}

export default postsReducer;