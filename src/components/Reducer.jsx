const reducer = (state, action) => {
    switch (action.type) {
      case 'fetch_success': {
        return {
          ...state,
          posts: action.payload,
        };
      }
      case 'DELETE_POST': {
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.payload),
        };
      }
      case 'ADD_POST': {
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
      }
      case 'UPDATE_POST': {
        return {
          ...state,
          posts: state.posts.map(post =>
            post.id === action.payload.id ? { ...post, ...action.payload } : post
          ),
        };
      }
      default:
        return state;
    }
  };

  export default reducer;