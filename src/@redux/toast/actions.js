import toastDefaultOptions from './toastDefaultOptions';

/**
 * Add Toast
 *
 * @param {import('@redux/toast').Toast} toast
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
