import axios from 'axios';
import {toast} from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:4001',
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Intercept incoming responses
instance.interceptors.response.use(
  response => {
    toast.success('Request successful!');
    return response;
  },
  error => {
    console.log('test', error);
    if (error.response) {
      // The request was made, but the server responded with a status different from 2xx
      const errorMessage = error.response.data.error || 'An error occurred';
      toast.error(errorMessage);
      console.log('ttest1');
    } else if (error.request) {
      // The request was made, but no response was received
      console.log('test2');
      toast.error('No response received from the server');
    } else {
      // An error occurred while setting up the request
      console.log('test3');
      toast.error('Internal server error');
    }
    return Promise.reject(error);
  },
);

export default instance;
