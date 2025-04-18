import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://med4u-api.onrender.com/api';
// const baseURL = 'https://med4u-api.onrender.com/api';
const baseURL = 'http://localhost:5000/api';
console.log(baseURL);

// Axios instance
const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Token expired. Logging out...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Common request functions
export const getRequest = async (url, config) => {
  const response = await axiosClient.get(url, config);
  return response.data;
};

export const postRequest = async (url, data, config) => {
  const response = await axiosClient.post(url, data, config);
  return response.data;
};

export const putRequest = async (url, data, config) => {
  const response = await axiosClient.put(url, data, config);
  return response.data;
};

export const deleteRequest = async (url, config) => {
  const response = await axiosClient.delete(url, config);
  return response.data;
};
