import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/artishokq/ReactWebDevelopment/tree/25-11-25-sem";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = "Bearer demo-token";
  return config;
});
