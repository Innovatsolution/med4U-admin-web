// src/services/httpService.js
import axios from "axios";
// import store from "../../toolkit/Store";

// Set the base URL from environment variables
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export const apiImageUrl = `${process.env.REACT_APP_API_URL}uploads/attachements/`

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the JWT token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    // const state = store.getState(); // Uncomment if using Redux store
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define HTTP methods for making API requests
const httpService = {
  get: (url, params = {}, config = {}) => {
    // Merge params into the config object
    const mergedConfig = {
      ...config,
      params: {
        ...params,
        ...config.params, // Merge with any existing params
      },
    };
    return axiosInstance.get(url, mergedConfig);
  },
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default httpService;
