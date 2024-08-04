import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@language_exchange:Token");

  config.headers!.authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { api };
