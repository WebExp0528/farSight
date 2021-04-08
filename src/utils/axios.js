import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
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
