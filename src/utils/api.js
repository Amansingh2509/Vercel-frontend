import axios from "axios";

// Use environment variable for API base URL in production
const getApiBaseUrl = () => {
  // Check for environment variable (set in Vercel)
  if (import.meta.env.VITE_API_URL) {
    console.log("API: Using VITE_API_URL:", import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  // In development, use relative URL (proxy handles it)
  if (import.meta.env.DEV) {
    console.log("API: Using local development URL");
    return "";
  }
  // Default to your Vercel backend URL
  const fallbackUrl = "https://vercel-backend-taey.vercel.app";
  console.log("API: Using fallback backend URL:", fallbackUrl);
  return fallbackUrl;
};

const apiBaseUrl = getApiBaseUrl();

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
