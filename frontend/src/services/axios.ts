import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;