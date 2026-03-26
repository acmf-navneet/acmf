
import axios from 'axios';

// Use the Environment variable if it exists (Prod), otherwise default to localhost (Dev)
// Note: Vite projects use import.meta.env.VITE_..., Create-React-App uses process.env.REACT_APP_...
// Vite uses import.meta.env and requires variables to start with VITE_
// Allow empty string for same-origin relative API paths (EC2+Nginx setup).
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.defaults.headers.post['Content-Type'] = 'application/json';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default api;
