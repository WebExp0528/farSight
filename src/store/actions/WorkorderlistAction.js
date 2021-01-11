import { GET_WORK_ORDERS, WORK_ORDERS_ERROR, GET_DETAILS, DETAILS_ERROR } from '../types'
import axios from 'axios'

export const getWorkOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/work_order/list', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
               
                "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
                "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
            }
        })
        dispatch({
            type: GET_WORK_ORDERS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: WORK_ORDERS_ERROR,
            payload: console.log(e),
        })
    }

}
// export const getDetails = () => async dispatch => {

//     try {
//         const res = await axios.get(`http://dev.northsight.io/api/work_order/05881777`, {
//             method: 'GET',
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//                 "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
//                 "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
//             }
//         })
//         dispatch({
//             type: GET_DETAILS,
//             payload: res.data
//         })
//     }
//     catch (e) {
//         dispatch({
//             type: DETAILS_ERROR,
//             payload: console.log(e),
//         })
//     }

// }
