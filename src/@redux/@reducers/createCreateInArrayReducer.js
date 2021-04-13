import { AnyAction } from 'redux';
import { StateWithArrayPayload, ReducerOptions } from './types';

/**
 * Appends new object from the payload to the data array
 * modifies isCreating of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createCreateInArrayReducer(baseName, initialState, options) {
  return function createInArrayReducer(state, action) {
    const { flushOnError = false } = options;

    switch (action.type) {
      case `${baseName}/CREATE_START`:
        return {
          ...state,
          isCreating: true
        };

      case `${baseName}/CREATE_ERROR`:
        return {
          ...state,
          isCreating: false,
          data: flushOnError ? initialState.data : state.data
        };
      case `${baseName}/CREATE_SUCCESS`: {
        const newCreate = !Array.isArray(action.payload) ? [action.payload] : action.payload;
        return {
          ...state,
          isCreating: false,
          data: [...state.data, ...newCreate]
        };
      }

      default:
        return state;
    }
  };
}

export default createCreateInArrayReducer;
