import { applyMiddleware, createStore } from 'redux';
import { createPromise as createPromiseMiddleware } from 'redux-promise-middleware';
import createThunkerMiddleware from 'redux-thunker';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import PouchDBStorage from 'redux-persist-pouchdb';
import PouchDB from 'pouchdb';

import transforms from './transform';

// the usual PouchDB stuff
PouchDB.plugin(require('pouchdb-adapter-idb'));
const pouchdb = new PouchDB('far-sight', {
  adapter: 'idb',
  auto_compaction: true,
  revs_limit: 1
});

const storage = new PouchDBStorage(pouchdb);

import { initialState } from './initialState';
import createAppReducer from './rootReducer';

import axios from './@thunker/axios';

const persistConfig = {
  key: 'root',
  storage,
  transforms: transforms
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig, // @ts-ignore
  persist: false // @ts-ignore
});

export default (preloadedState = initialState, history) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const isServer = process.env.BUILD_TARGET === 'server';

  const promiseMiddleware = createPromiseMiddleware({
    promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
  });

  const thunkerMiddleware = createThunkerMiddleware({
    config: {
      reduxThunkCompatible: false,
      continuous: true
    },
    extraArgumentsEnhanced: {
      axios
    },
    extraArguments: {
      history
    }
  });

  const middleware = [thunkerMiddleware, promiseMiddleware, offlineMiddleware];

  if (isDev && !isServer) {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true
    });
    middleware.push(logger);
  }

  const appReducer = createAppReducer(preloadedState);

  // @ts-ignore
  const persistedReducer = persistReducer(persistConfig, offlineEnhanceReducer(appReducer));

  const store = createStore(
    persistedReducer,
    preloadedState, // @ts-ignore
    composeWithDevTools(offlineEnhanceStore, applyMiddleware(...middleware))
  );

  let persistor = persistStore(store);

  return { store, persistor };
};
