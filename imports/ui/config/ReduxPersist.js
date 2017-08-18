import localForage from 'localforage';

const REDUX_PERSIST = {
  reducerVersion: '6',
  storeConfig: {
    storage: localForage,
  },
};

export default REDUX_PERSIST;
