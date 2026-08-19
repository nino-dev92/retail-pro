import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://retail-pro-server.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default apiAxios;
