import localForage from 'localforage';

const REDUX_PERSIST = {
  reducerVersion: '8',
  storeConfig: {
    storage: localForage,
    blacklist: ['entities'],
  },
};

export default REDUX_PERSIST;
