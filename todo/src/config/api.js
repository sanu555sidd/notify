// API configuration for different environments

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://notify-2-jp1b.onrender.com/api'  // Your actual backend URL with /api
  : '/api';

export { API_BASE_URL };

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
