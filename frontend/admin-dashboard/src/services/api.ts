import axios from "axios";
import { SKU } from "../types/sku";
import api from "../api";

const API = axios.create({
  baseURL: "http://localhost:4000", // sesuaikan dengan backendmu
});

export default api;

// GET all SKU
export const fetchSKUs = async (): Promise<SKU[]> => {
  const res = await API.get<SKU[]>("/sku");
  return res.data;
};

// CREATE SKU
export const createSKU = async (sku: Omit<SKU, "id">): Promise<SKU> => {
  const res = await API.post<SKU>("/sku", sku);
  return res.data;
};

// UPDATE SKU
export const updateSKU = async (id: number, sku: Partial<SKU>): Promise<SKU> => {
  const res = await API.put<SKU>(`/sku/${id}`, sku);
  return res.data;
};

// DELETE SKU
export const deleteSKU = async (id: number): Promise<void> => {
  await API.delete(`/sku/${id}`);
};
