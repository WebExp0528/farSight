import { combineReducers } from 'redux';
import snacks from './toast';
import { initialState } from './initialState';

const {
  snacks: initSnacks, // do not reset snacks but the rest
  ...emptyInitState
} = initialState;

const createAppReducer = initialState => {
  const appReducer = combineReducers({
    snacks
  });

  return (state = initialState, action) => {
    const nextState = appReducer(state, action);
    if (action.type === '@auth/SIGN_OUT' || (action.error && action.payload.status === 401)) {
      if (localStorage) {
        localStorage.clear();
      }
      return {
        ...nextState,
        ...emptyInitState
      };
    }

    return nextState;
  };
};

export default createAppReducer;
