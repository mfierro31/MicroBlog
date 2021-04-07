import { 
  ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, GET_POST, VOTE_FULL
} from '../actions/actionTypes';

function postsFullReducer(state = {}, action) { 
  let post = state[action.postId];

  switch(action.type) {
    case GET_POST:
      return { ...state, [action.post.id]: action.post };
    case ADD_POST:
      return { ...state, [action.post.id]: { ...action.post, comments: [] } };
    case EDIT_POST:
      return { ...state, [action.postId]: { ...action.editedPost, comments: state[action.postId].comments } };
    case DELETE_POST:
      const postsCopy = { ...state };
      delete postsCopy[action.postId];
      return postsCopy;
    case ADD_COMMENT:
      return { ...state, [action.postId]: { ...post, comments: [...post.comments, action.newComment] } };
    case DELETE_COMMENT:
      return { ...state, [action.postId]: { ...post, comments: post.comments.filter(c => c.id !== action.commentId) } };
    case VOTE_FULL:
      return { ...state, [action.postId]: { ...post, votes: action.votes } };
    default:
      return state;
  }
}

export default postsFullReducer;