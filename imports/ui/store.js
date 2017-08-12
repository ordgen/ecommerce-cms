import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import localForage from 'localforage';
import { persistStore, autoRehydrate } from 'redux-persist';
import { _ } from 'underscore';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import { fetchAndCreateProductCategories } from './actions/action-creators/ProductCategories';
import { fetchAndCreateSliderImages } from './actions/action-creators/SliderImages';

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

persistStore(store, { storage: localForage }, () => {
  if (_.isEmpty(store.getState().entities.ProductCategory.items)) {
    store.dispatch(fetchAndCreateProductCategories());
  }
  if (_.isEmpty(store.getState().entities.SliderImage.items)) {
    store.dispatch(fetchAndCreateSliderImages());
  }
});

export default store;
