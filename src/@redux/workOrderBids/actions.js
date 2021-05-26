import { genActionTypes } from 'helpers';

export const ACTION_NAME = 'work_order_bids';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Get bids
 * @param {string | number} id
 * @returns
 */
export const get = id => ({ axios }) => ({
  type: ACTION_TYPES.GET,
  meta: {
    toast_success: {
      content: 'Get WorkOrder Bids'
    },
    toast_error: {
      content: 'Could not get WorkOrder Bids'
    }
  },
  payload: axios.get(`/api/work_order/${id}/bid`).then(res => {
    return { data: res.data };
  })
});

export const create = (id, bidItem) => ({ axios }) => ({
  type: ACTION_TYPES.CREATE,
  meta: {
    toast_success: {
      content: 'Created WorkOrder Bid Item'
    },
    toast_error: {
      content: 'Could not create WorkOrder Bid Item'
    }
  },
  payload: axios.post(`/api/work_order/${id}/bid`, [{ ...bidItem, bid_item_number: 'new' }]).then(res => {
    return res.data;
  })
});
