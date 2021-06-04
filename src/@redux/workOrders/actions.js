export const get =
  () =>
  ({ axios }) => ({
    type: '@work_orders/GET',
    payload: axios
      .get('/api/work_order/list', {
        method: 'GET'
      })
      .then(res => {
        console.log(axios);
        return { data: res.data };
      })
  });
