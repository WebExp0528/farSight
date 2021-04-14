export const get = () => ({ axios }) => ({
  type: '@work_orders/GET',
  meta: {
    toast_success: {
      content: 'Get Work Orders'
    }
  },
  payload: axios
    .get('/api/work_order/list', {
      method: 'GET'
    })
    .then(res => {
      return { data: res.data };
    })
});
