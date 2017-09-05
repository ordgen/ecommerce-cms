import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import ReduxPersist from './config/ReduxPersist';
import { fetchAndCreateProductCategories } from './actions/action-creators/ProductCategories';
import { fetchAndCreateSliderImages } from './actions/action-creators/SliderImages';
import { fetchAndCreateOrders } from './actions/action-creators/Orders';
import { fetchAndCreateCartItems } from './actions/action-creators/CartItems';

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  // begin a fresh store
  persistStore(store, config, () => {
    // seed store with initial data from async
    store.dispatch(fetchAndCreateProductCategories());
    store.dispatch(fetchAndCreateSliderImages());
    store.dispatch(fetchAndCreateOrders());
    store.dispatch(fetchAndCreateCartItems());
  });

  // check to ensure latest reducer version
  localForage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store and refresh
      persistStore(store, config, () => {
        // start a fresh store
        persistStore(store, config);
      }).purge();
      // Update reducer to current version number
      localForage.setItem('reducerVersion', reducerVersion);
    }
  }).catch(() => {
    localForage.setItem('reducerVersion', reducerVersion);
  });
};

export default updateReducers;

