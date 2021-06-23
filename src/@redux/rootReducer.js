import { combineReducers } from 'redux';

import { initialState } from './initialState';

import toast from './toast';
import workOrders from './workOrders';
import workOrderDetail from './workOrderDetail';
import workOrderBids from './workOrderBids';
import workOrderPhotos from './workOrderPhotos';
import uploadPhotos from './uploadPhotos';
import photosMeta from './photosMeta';

const {
  toasts: _initToast, // do not reset toast but the rest
  ...emptyInitState
} = initialState;

/**
 *
 * @param {import('.').AppState} initialState
 * @returns
 */
const createAppReducer = initialState => {
  const appReducer = combineReducers({
    toast,
    workOrders,
    workOrderDetail,
    workOrderBids,
    workOrderPhotos,
    uploadPhotos,
    photosMeta
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
