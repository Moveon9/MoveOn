import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'url',
  timeout: 5000,
});

export default axiosInstance;
