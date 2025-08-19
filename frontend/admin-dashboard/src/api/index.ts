// src/api/index.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // ganti sesuai backend URL
  headers: { "Content-Type": "application/json" },
});

export default api;
