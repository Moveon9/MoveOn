import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.79.175.116',
  timeout: 5000,
});

export default axiosInstance;
