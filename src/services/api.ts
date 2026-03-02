import useAuthStore from "@/store/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API || "http://localhost:4101/api/v1";

const apiAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiPublic = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      useAuthStore.getState().setAuthenticated(false);
    } else if (error.response?.status >= 500) {
      localStorage.removeItem("authToken");
      useAuthStore.getState().setAuthenticated(false);
    }

    return Promise.reject(error);
  },
);

export { apiAuth, apiPublic };
