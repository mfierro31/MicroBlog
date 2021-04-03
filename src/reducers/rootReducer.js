import { v4 as uuid } from 'uuid';

const INITIAL_STATE = { blogPosts: JSON.parse(window.localStorage.getItem('blogPosts')) || {} };

function rootReducer(state = INITIAL_STATE, action) {  
  switch(action.type) {
    case "ADD_POST":
      const newPostId = uuid();
      const newPost = { 
        ...action.post, 
        comments: {} 
      };
      const updatedState = { ...state, blogPosts: { ...blogPosts, [newPostId]: newPost} };

      window.localStorage.setItem('blogPosts', JSON.stringify(updatedState.blogPosts));
      return updatedState;
    case "EDIT_POST":
      const stateCopy = { ...state };

      stateCopy.blogPosts[action.postId] = { ...stateCopy.blogPosts[action.postId], ...action.editedPost };

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy.blogPosts));
      return stateCopy;
    case "DELETE_POST":
      const stateCopy = { ...state };
    
      delete stateCopy.blogPosts[action.postId];

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy.blogPosts));
      return stateCopy;
    case "ADD_COMMENT":
      const stateCopy = { ...state };
      const blogPost = stateCopy.blogPosts[action.postId];
      const commentId = uuid();

      blogPost.comments[commentId] = action.text;

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy.blogPosts));
      return stateCopy;
    case "DELETE_COMMENT":
      const stateCopy = { ...state };
      const blogPost = stateCopy.blogPosts[action.postId];

      delete blogPost.comments[action.commentId];

      window.localStorage.setItem('blogPosts', JSON.stringify(stateCopy.blogPosts));
      return stateCopy;
    default:
      return state;
  }
}

export default rootReducer;