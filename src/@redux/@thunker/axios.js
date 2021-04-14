import axios from 'axios';

const axiosClient = ({ getState, dispatch }) => {
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
    console.log('[===== Started API Call =====]');
    return config;
  });

  axiosInstance.interceptors.response.use(response => {
    /* ------------------------------ API Call End ------------------------------ */
    console.log('[===== Ended API Call =====]');
    if (response.status >= 400) {
      if (response.status === 401) {
        window.location.replace('/');
        return;
      }
    }
    return response;
  });

  return axiosInstance;
};

export default axiosClient;
