import { GET_DETAILS } from "../types";

const initialState = {
  won: [],
  loading: true,
};

/**
 * Description Reducer
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function Descriptionreducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS:
      return {
        //State modified.  must copy.  (... operator)
        ...state,
        won: action.payload,
        loading: false,
      };

    default:
      return state; //no modification.  return original state
  }
}
