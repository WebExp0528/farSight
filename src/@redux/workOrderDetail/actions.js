/**
 *
 * @param {string | number} id
 * @returns
 */
export const get =
  id =>
  ({ axios }) => ({
    type: '@work_order_detail/GET',
    // meta: {
    //   toast_success: {
    //     content: 'Get WorkOrderDetail'
    //   },
    //   toast_error: {
    //     content: 'Could not get WorkOrderDetail'
    //   }
    // },
    payload: axios.get(`/api/work_order/${id}`).then(res => {
      return res.data;
    })
  });

/**
 *
 * @param {string | number} id
 * @param {{expected_upload_date : Date, explanation : string, delay_reason: string, [index:string]:any}} data
 * @returns
 */
export const updateStatus =
  (id, data) =>
  ({ axios }) => ({
    type: '@work_order_detail/UPDATE',
    // meta: {
    //   toast_success: {
    //     content: 'Update WorkOrderDetail'
    //   },
    //   toast_error: {
    //     content: 'Could not update WorkOrderDetail'
    //   }
    // },
    payload: axios
      .post(`/api/work_order/${id}`, {
        ...data
      })
      .then(res => {
        return res.data;
      })
  });
