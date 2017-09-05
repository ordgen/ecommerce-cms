import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import ormReducer from './orm';
import cartItemReducer from './cartItemOrm';
import isLoadingReducer from './isLoading';

export default combineReducers({
  auth: authReducer,
  router: routerReducer,
  entities: ormReducer,
  isLoading: isLoadingReducer,
  cartItems: cartItemReducer,
});
