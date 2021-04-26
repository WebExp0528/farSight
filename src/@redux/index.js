import reducer from './rootReducer';
import { useSelector } from 'react-redux';

export const rootReducer = reducer;

export { default as createStore } from './createStore';

/**
 * AppState Type
 *
 * @typedef {typeof import('@redux/initialState').initialState} AppState
 */

/**
 * Get States
 *
 * @param {keyof AppState} key
 * @returns
 */
export const useRedux = key => useSelector(state => state[key]);

/**
 * Get Loading State
 *
 * @param  {...keyof AppState} keys
 * @returns {boolean}
 */
export const useReduxLoading = (...keys) =>
  useSelector(state => keys.some(key => state[key]['isLoading'] || state[key]['isInitLoading']));
