import { combineReducers } from 'redux';
import postsFullReducer from './postsFullReducer';
import postsMinReducer from './postsMinReducer';

const rootReducer = combineReducers({ 
  blogPostsFull: postsFullReducer, 
  blogPostsMin: postsMinReducer,
});

export default rootReducer;