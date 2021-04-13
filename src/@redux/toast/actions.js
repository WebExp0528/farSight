import toastDefaultOptions from './toastDefaultOptions';
import { Snack, SnackInput } from './types';

/**
 * Add Toast
 * @param {{id: string | number, autohide: boolean, animation: boolean, delay: number, onClose: Function}} snack
 * @returns
 */
export const Add = toast => ({
  type: '@snack/ADD',
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
  type: '@snack/DELETE',
  payload: id
});
