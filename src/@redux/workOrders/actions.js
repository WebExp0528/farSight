export const get = () => ({ axios }) => {
  console.log('asdfasdfasd', axios);
  return {
    type: '@work_orders/GET',
    payload: axios
      .get('/api/work_order/list', {
        method: 'GET'
      })
      .then(res => {
        return res.data;
      })
  };
};
