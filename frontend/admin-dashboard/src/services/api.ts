import axios, { AxiosHeaders } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = new AxiosHeaders(); // ✅ bikin kosong tapi sesuai tipe
  }

  if (token) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default instance;
