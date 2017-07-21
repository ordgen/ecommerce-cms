import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import ormReducer from './orm';

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  // Insert the auto-generated Redux-ORM reducer.  This will
  // initialize our model "tables", and hook up the reducer
  // logic we defined on each Model subclass
  entities: ormReducer,
});

// Dispatch an action to create a Post instance
/* store.dispatch({
  type : "CREATE_POST",
  payload : {
    id : 1,
    name : "Test Post Please Ignore" 
  }
});
*/
// Dispatch an action to create a Comment instance as a child of that Post
/* store.dispatch({
  type : "ADD_COMMENT",
  payload : {
    postId : 1,
    commentId : 123,
    commentText : "This is a comment"
  }
});*/
