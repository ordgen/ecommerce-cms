import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import { _ } from 'underscore';
import ReduxPersist from './config/ReduxPersist';
import { fetchAndCreateProductCategories } from './actions/action-creators/ProductCategories';
import { fetchAndCreateSliderImages } from './actions/action-creators/SliderImages';

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  // begin a fresh store
  persistStore(store, config, () => {
    // seed store with initial data from async
    if (_.isEmpty(store.getState().entities.ProductCategory.items)) {
      store.dispatch(fetchAndCreateProductCategories());
    }
    if (_.isEmpty(store.getState().entities.SliderImage.items)) {
      store.dispatch(fetchAndCreateSliderImages());
    }
  });

  // check to ensure latest reducer version
  localForage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      console.log(localVersion);
      // Purge store and refresh
      persistStore(store, config, () => {
        // start a fresh store
        // persistStore(store, config);
      }).purge();
      // Update reducer to current version number
      localForage.setItem('reducerVersion', reducerVersion);
    }
  }).catch(() => {
    localForage.setItem('reducerVersion', reducerVersion);
  });
};

export default updateReducers;

