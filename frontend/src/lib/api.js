import axios from 'axios';

// When running on Vercel, the backend is routed to /_/backend
// In local development, we point to the local Express server
const baseURL = import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000';

const api = axios.create({
  baseURL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
