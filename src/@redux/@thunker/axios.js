import axios from 'axios';
import { set as setUser } from '../user/actions';

/* eslint-disable no-console */
const axiosClient = ({ _getState, dispatch }) => {
  /**
   * Create Axios Instance
   */
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  axiosInstance.interceptors.request.use(config => {
    /* ----------------------------- API Call Start ----------------------------- */
    // console.log('[===== Started API Call =====]');
    return config;
  });

  axiosInstance.interceptors.response.use(
    response => {
      /* ------------------------------ API Call End ------------------------------ */
      // console.log('[===== Ended API Call =====]');

      const { headers = {} } = response;
      const userName = headers['x-vendor-name'];
      dispatch(
        setUser({
          name: userName
        })
      );
      return response;
    },
    error => {
      if (error?.response?.status >= 400) {
        if (error?.response?.status === 401) {
          window.location.replace('/requestMagicLink');
        }
      }
      throw error;
    }
  );

  return axiosInstance;
};

export default axiosClient;
