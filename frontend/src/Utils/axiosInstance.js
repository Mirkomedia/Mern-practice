// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // Replace with your backend base URL
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json', // Default header
  },
});


export default axiosInstance;
