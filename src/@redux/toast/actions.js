import toastDefaultOptions from './toastDefaultOptions';

/**
 * Add Toast
 * @param {{id: string | number, autohide: boolean, animation: boolean, delay: number, onClose: Function}} toast
 * @returns
 */
export const Add = toast => ({
  type: '@toast/ADD',
  payload: {
    ...toastDefaultOptions,
    ...toast
  }
});

/**
 * Delete Toast
 *
 * @param {string | number} id
 * @returns
 */
export const Delete = id => ({
  type: '@toast/DELETE',
  payload: id
});
