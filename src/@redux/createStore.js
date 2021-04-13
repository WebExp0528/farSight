import { applyMiddleware, createStore } from 'redux';

import { createPromise as createPromiseMiddleware } from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import createAppReducer from './rootReducer';
import getInitialStateFromLocalStorage from './getInitialStateFromLocalStorage';

import axios from 'utils/axios';

export default (preloadedState = getInitialStateFromLocalStorage(), history) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const isServer = process.env.BUILD_TARGET === 'server';

  const promiseMiddleware = createPromiseMiddleware({
    promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
  });

  const middleware = [thunk.withExtraArgument({ axios, history }), promiseMiddleware];

  if (isDev && !isServer) {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true
    });
    middleware.push(logger);
  }

  const appReducer = createAppReducer(preloadedState, history);

  const store = createStore(appReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));

  return store;
};
