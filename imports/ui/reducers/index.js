import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import ormReducer from './orm';
import isLoadingReducer from './isLoading';

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  entities: ormReducer,
  isLoading: isLoadingReducer,
});
