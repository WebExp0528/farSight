import { genActionTypes } from 'helpers';

export const ACTION_NAME = 'work_order_photos';
const ACTION_TYPES = genActionTypes(ACTION_NAME);

/**
 * Get Photos
 * @param {string | number} id
 * @returns
 */
export const get =
  id =>
  ({ axios }) => ({
    type: ACTION_TYPES.GET,
    meta: {
      toast_success: {
        content: 'Get WorkOrder Photos'
      },
      toast_error: {
        content: 'Could not get WorkOrder Photos'
      }
    },
    payload: axios.get(`/api/work_order/${id}/photo`).then(res => {
      return { data: res.data };
    })
  });
