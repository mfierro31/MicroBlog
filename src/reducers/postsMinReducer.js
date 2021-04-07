import { 
  ADD_POST, EDIT_POST, DELETE_POST, GET_POSTS, VOTE_MIN
} from '../actions/actionTypes';

function sortByVote(posts) {
  return posts.sort((a, b) => b.votes - a.votes);
}

function makeMinPostFromFullPost({id, title, description, votes}) {
  return {id, title, description, votes};
}

function postsMinReducer(state = [], action) {
  switch(action.type) {
    case GET_POSTS:
      return sortByVote(action.posts);
    case ADD_POST:
      return sortByVote([...state, makeMinPostFromFullPost(action.post)]);
    case EDIT_POST:
      return state.map(post => post.id === action.postId ? makeMinPostFromFullPost(action.editedPost) : post);
    case DELETE_POST:
      return state.filter(p => p.id !== action.postId);
    case VOTE_MIN:
      return sortByVote(state.map(post => post.id === action.postId ? { ...post, votes: action.votes } : post));
    default:
      return state;
  }
}

export default postsMinReducer;