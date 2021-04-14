import { initialState } from './initialState';
import { localStorage } from 'helpers';

/**
 * As an initial state,
 * we are merging default initial state and data from the localstorage first
 */

const initReducerState = {
  isInitLoading: true,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false
};

export default () => ({
  ...initialState,
  workOrders: {
    ...initialState.workOrders,
    ...localStorage('@work_orders').get(),
    ...initReducerState
  },
  workOrderDetail: {
    ...initialState.workOrderDetail,
    ...localStorage('@work_order_detail').get(),
    ...initReducerState
  }
});
