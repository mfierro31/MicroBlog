import { combineReducers } from 'redux';
import postsFullReducer from './postsFullReducer';
import postsMinReducer from './postsMinReducer';
import editReducer from './editReducer';

const rootReducer = combineReducers({ 
  blogPostsFull: postsFullReducer, 
  blogPostsMin: postsMinReducer, 
  editing: editReducer 
});

export default rootReducer;