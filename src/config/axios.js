import axios from 'axios';
import {toast} from 'react-toastify';

//const url = "http://localhost:4001/";
// const url = 'https://api.spotify.ismadev.net/';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    if (config.method !== 'get' && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Intercept incoming responses
instance.interceptors.response.use(
  response => {
    if (response.config.method !== 'get') {
      toast.success('Request successful!');
    }
    return response;
  },
  error => {
    if (error.response) {
      // The request was made, but the server responded with a status different from 2xx
      const errorMessage = error.response.data.error || 'An error occurred';
      toast.error(errorMessage);
    } else if (error.request) {
      // The request was made, but no response was received
      toast.error('No response received from the server');
    } else {
      // An error occurred while setting up the request
      toast.error('Internal server error');
    }
    return Promise.reject(error);
  },
);

export default instance;
