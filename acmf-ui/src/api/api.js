
import axios from 'axios';

// Use the Environment variable if it exists (Prod), otherwise default to localhost (Dev)
// Note: Vite projects use import.meta.env.VITE_..., Create-React-App uses process.env.REACT_APP_...
// Vite uses import.meta.env and requires variables to start with VITE_
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
