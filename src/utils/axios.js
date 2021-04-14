import axios from 'axios';

/**
 * Create Axios Instance
 */
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': true
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
  return response;
});

export default axiosInstance;
