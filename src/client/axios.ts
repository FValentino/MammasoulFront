import axios from "axios";
//import.meta.env.VITE_API_BASE_URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});