const INITIAL_STATE = [];

function postsMinReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case "GET_POSTS":
      return action.posts;
    default:
      return state;
  }
}

export default postsMinReducer;