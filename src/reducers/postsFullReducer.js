const INITIAL_STATE = {};

function postsFullReducer(state = INITIAL_STATE, action) {  
  switch(action.type) {
    case "GET_POST":
      return action.post;
    default:
      return state;
  }
}

export default postsFullReducer;