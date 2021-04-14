export const get = () => ({ axios }) => ({
  type: '@work_orders/GET',
  meta: {
    toast_success: {
      content: 'Get WorkOrders'
    },
    toast_error: {
      content: 'Could not WorkOrders'
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
