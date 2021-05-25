function getState(reducers, index, state, action) {
  if (reducers.length > index) {
    return getState(reducers, index + 1, reducers[index](state, action), action);
  }

  return state;
}

export function composeReducers(initialState) {
  return function withReducers(...reducers) {
    return function wrappingReducer(state = initialState, action) {
      if (
        action.payload &&
        action.payload.status &&
        action.payload.status === 403 &&
        action.payload.redirect === true
      ) {
        window.location.replace('/app');
      }
      return getState(reducers, 0, state, action);
    };
  };
}

export default composeReducers;
