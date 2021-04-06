import { GET_DETAILS, GET_WORK_ORDERS } from '../types';

const initialState = {
  workOrders: [],
  loading: true
};

export default function listreducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORK_ORDERS:
      return {
        ...state,
        workOrders: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
