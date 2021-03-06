/**
 * Processes data and pagination from the server response
 * Saves data and pagination as { data, pagination }
 * Data is expected to be an array
 * modifies isLoading of the state
 *
 * @param baseName
 * @param initialState
 * @param options
 */
export function createGetWithPaginationReducer(baseName, initialState, options = {}) {
  return function getWithPaginationReducer(state, action) {
    const { flushOnError = false, flushOnStart = false } = options;

    switch (action.type) {
      case `${baseName}/GET_START`:
        return flushOnStart
          ? {
              ...initialState,
              isLoading: true,
              isInitLoading: false
            }
          : {
              ...state,
              isLoading: true,
              isInitLoading: false
            };

      case `${baseName}/GET_ERROR`:
        return {
          ...state,
          isLoading: false,
          data: flushOnError ? initialState.data : state.data
        };
      case `${baseName}/GET_SUCCESS`: {
        const { data, ...pagination } = action.payload;
        return {
          ...state,
          data,
          pagination,
          isLoading: false
        };
      }

      default:
        return state;
    }
  };
}

export default createGetWithPaginationReducer;
