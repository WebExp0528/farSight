import { genActionTypes } from 'helpers';

export const ACTION_NAME = 'work_order_bids';

/**
 *
 * @param {string | number} id
 * @returns
 */
export const get = id => ({ axios }) => ({
  type: genActionTypes(ACTION_NAME).GET,
  meta: {
    toast_success: {
      content: 'Get WorkOrder Bids'
    },
    toast_error: {
      content: 'Could not get WorkOrder Bids'
    }
  },
  payload: axios.get(`/api/work_order/${id}/bid`).then(res => {
    return res.data;
  })
});
