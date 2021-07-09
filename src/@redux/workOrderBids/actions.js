import { genActionTypes } from 'helpers';

export const ACTION_NAME = 'work_order_bids';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Get bids
 * @param {string | number} id
 * @returns
 */
export const get =
  id =>
  ({ axios }) => ({
    type: ACTION_TYPES.GET,
    payload: axios.get(`/api/work_order/${id}/bid`).then(res => {
      return { data: res.data };
    })
  });

export const create =
  (id, bidItem) =>
  ({ axios }) => ({
    type: ACTION_TYPES.CREATE,
    payload: axios.post(`/api/work_order/${id}/bid`, [{ ...bidItem, bid_item_number: 'new' }]).then(res => {
      return res.data;
    })
  });

export const cancel =
  (id, bidItem) =>
  ({ axios }) => ({
    type: ACTION_TYPES.DELETE,
    payload: axios
      .request({
        url: `/api/work_order/${id}/bid/${bidItem.bid_item_number}`,
        method: 'delete'
      })
      .then(res => {
        return res.data;
      })
  });
