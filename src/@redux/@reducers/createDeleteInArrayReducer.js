import { AnyAction } from 'redux';
import { StateWithArrayPayload, ReducerOptions } from './types';

/**
 * Removes item from the data which is an array of objects with "id" property
 * modifies isDeleting of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createDeleteInArrayReducer(baseName, initialState, options) {
  return function deleteInArrayReducer(state, action) {
    const { flushOnError = false } = options;

    switch (action.type) {
      case `${baseName}/DELETE_START`:
        return {
          ...state,
          isDeleting: true
        };

      case `${baseName}/DELETE_ERROR`:
        return {
          ...state,
          isDeleting: false,
          data: flushOnError ? initialState.data : state.data
        };
      case `${baseName}/DELETE_SUCCESS`: {
        return {
          ...state,
          isDeleting: false,
          data: state.data.filter(item => item.id !== action.payload)
        };
      }

      default:
        return state;
    }
  };
}

export default createDeleteInArrayReducer;
