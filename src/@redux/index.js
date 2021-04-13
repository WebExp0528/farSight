import reducer from './rootReducer';
import { useSelector } from 'react-redux';

export const rootReducer = reducer;

export { default as createStore } from './createStore';

export const useRedux = key => useSelector(state => state[key]);

export const useReduxLoading = (...keys) =>
  useSelector(state => keys.some(key => state[key]['isLoading'] || state[key]['isInitLoading']));
