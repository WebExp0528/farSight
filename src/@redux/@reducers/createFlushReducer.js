/**
 * Replaces state with initial state
 *
 * @param baseName
 * @param initialDataState
 */
export const createFlushReducer = (baseName, initialDataState) => (state, action) => {
  switch (action.type) {
    case `${baseName}/FLUSH`:
      return {
        ...state,
        data: initialDataState
      };

    default:
      return state;
  }
};

export default createFlushReducer;
