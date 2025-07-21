// API configuration for different environments

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend-app.onrender.com/api'  // Replace with your Render backend URL
  : '/api';

export { API_BASE_URL };

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
