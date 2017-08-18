import localForage from 'localforage';

const REDUX_PERSIST = {
  reducerVersion: '1',
  storeConfig: {
    storage: localForage,
  },
};

export default REDUX_PERSIST;
