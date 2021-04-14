/**
 *
 * @param {string | number} id
 * @returns
 */
export const get = id => ({ axios }) => ({
  type: '@work_order_detail/GET',
  payload: axios
    .get(`/api/work_order/${id}`, {
      method: 'GET'
    })
    .then(res => {
      return res.data;
    })
});
