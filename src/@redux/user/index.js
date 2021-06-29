import { createFlushReducer, composeReducers } from '../@reducers';
import initialState from './initialState';

const NAME = '@user';

const getReducer = (state, action) => {
  switch (action.type) {
    case `@user/CREATE`: {
      return {
        ...state,
        ...(action?.payload || {})
      };
    }

    default:
      return state;
  }
};

const flushReducer = createFlushReducer(NAME, []);

export const userReducer = composeReducers(initialState)(getReducer, flushReducer);

export default userReducer;
