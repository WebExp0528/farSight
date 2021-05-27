import { applyMiddleware, createStore } from 'redux';
// import { persistStore } from 'redux-pouchdb';
import { createPromise as createPromiseMiddleware } from 'redux-promise-middleware';
import createThunkerMiddleware from 'redux-thunker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { initialState } from './initialState';

import createAppReducer from './rootReducer';

import axios from './@thunker/axios';

const persistConfig = {
  key: 'root',
  storage
};

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

  const middleware = [thunkerMiddleware, promiseMiddleware];

  if (isDev && !isServer) {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true
    });
    middleware.push(logger);
  }

  const appReducer = createAppReducer(preloadedState);

  // @ts-ignore
  const persistedReducer = persistReducer(persistConfig, appReducer);

  // @ts-ignore
  const store = createStore(persistedReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));
  let persistor = persistStore(store);

  return { store, persistor };
};
