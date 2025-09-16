import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "https://baat-chit-chat.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
