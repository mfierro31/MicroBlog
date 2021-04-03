import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import editReducer from './editReducer';

const rootReducer = combineReducers({ blogPosts: postsReducer, editing: editReducer });

export default rootReducer;