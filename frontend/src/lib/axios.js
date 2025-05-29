import axios from "axios";

const BASE_URL = "https://baatchit-chat-app.onrender.com/"
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
