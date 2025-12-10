import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/artishokq/ReactWebDevelopment";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = "Bearer demo-token";
  return config;
});
