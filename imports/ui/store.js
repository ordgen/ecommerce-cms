import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import rehydrationServices from './rehydrationServices';

export const history = createHistory();

const initialState = {};
const middleware = [
  thunk,
  routerMiddleware(history),
];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
    ),
  ),
);

rehydrationServices(store);

export default store;
