import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import ormReducer from './orm';
import isFetchingReducer from './isFetching';

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  entities: ormReducer,
  isFetching: isFetchingReducer,
});
