import { AnyAction } from 'redux';
import { StateWithArrayPayload, ReducerOptions } from './types';

/**
 * Handles update for an item in an array reducer. Requires "id" property
 * modifies isUpdating of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createUpdateInArrayReducer(baseName, initialState, options) {
  return function updateInArrayReducer(state, action) {
    const { flushOnError = false } = options;
    switch (action.type) {
      case `${baseName}/UPDATE_START`:
        return {
          ...state,
          isUpdating: true
        };

      case `${baseName}/UPDATE_ERROR`:
        return {
          ...state,
          isUpdating: false,
          data: flushOnError ? initialState.data : state.data
        };
      case `${baseName}/UPDATE_SUCCESS`: {
        const { id } = action.payload;

        const replaceIndex = state.data.findIndex(item => item.id === id);
        const newData = [...state.data];
        let payloadData = action.payload;
        delete payloadData['snack'];
        newData.splice(replaceIndex, 1, payloadData);

        return {
          ...state,
          isUpdating: false,
          data: [...newData]
        };
      }

      default:
        return state;
    }
  };
}

export default createUpdateInArrayReducer;
