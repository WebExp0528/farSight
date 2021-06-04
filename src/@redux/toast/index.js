import initialState from './initialState';
import toastDefaultOptions from './toastDefaultOptions';

/**
 * @typedef {{id?: string | number, autohide?: boolean, animation?: boolean, delay?: number, onClose?: Function, type?: 'success' | 'error', content?: string}} Toast
 */

/**
 * Add Toast
 *
 * @param {Toast} data
 * @returns
 */
const newToast = data => ({
  id: Math.random(),
  ...toastDefaultOptions,
  ...data
});

/**
 * Add New Toast
 * @param {Toast[]} data
 * @param {Toast} toast
 * @returns
 */
const addNewToast = (data, toast) => {
  const nextData = [...data.filter(item => item.id !== toast.id), toast];
  return nextData;
};

/**
 * Toast Reducer
 */
export default (state = initialState, action) => {
  if (action.type.endsWith('_ERROR') && action.error && action.payload) {
    // UnAuthorized Error
    if (action.payload.status === 401) {
      return addNewToast(
        state,
        newToast({
          id: 'unauthorized',
          type: 'error',
          content: 'You are not logged in or your session expired. Please login again.'
        })
      );
    }

    if (action.payload.status === 403) {
      return addNewToast(
        state,
        newToast({
          id: 'nopermission',
          type: 'error',
          content: action.payload.message || action.payload.error || 'You have no access permission in this app.'
        })
      );
    }
  }

  if (action.meta && action.type.endsWith('_SUCCESS')) {
    if (action.meta.toast_success) {
      let toastData = {
        ...action.meta.toast_success,
        type: 'success'
      };
      if (action.payload['toast']) {
        toastData = {
          type: 'success',
          ...action.payload['toast']
        };
      }
      return [...state, newToast(toastData)];
    }
  }
  if (action.type.endsWith('_ERROR')) {
    if (action.meta && action.meta.toast_error) {
      return [
        ...state,
        newToast({
          ...action.meta.toast_error,
          type: 'error'
        })
      ];
    }
    return [
      ...state,
      newToast({
        // the errors from the server should be mapped
        content: action.payload.message || action.payload.error || "Oops! We couldn't reach the server!",
        type: 'error'
      })
    ];
  }

  switch (action.type) {
    case '@toast/ADD':
      return [...state, newToast(action.payload)];
    case '@toast/DELETE':
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};
