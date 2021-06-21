import { applyMiddleware, createStore } from 'redux';
import { createPromise as createPromiseMiddleware } from 'redux-promise-middleware';
import createThunkerMiddleware from 'redux-thunker';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';
import localforage from 'localforage';

import transforms from './transform';

import { initialState } from './initialState';
import createAppReducer from './rootReducer';

import axios from './@thunker/axios';

const storage = localforage.createInstance({ name: '@FarSightStore' });

const persistConfig = {
  key: 'root',
  storage: storage,
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
