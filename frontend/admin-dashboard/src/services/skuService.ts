import axios from "axios";
import { SKU } from "../types/sku";

const API_URL = "http://localhost:4000/api/sku";

export const getSKUs = async (
  search: string = "",
  page: number = 1,
  limit: number = 20
): Promise<{ data: SKU[]; pagination: any }> => {
  const res = await axios.get(API_URL, { params: { search, page, limit } });
  return res.data;
};

export const createSKU = async (data: Omit<SKU, "id" | "created_at" | "updated_at">): Promise<SKU> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateSKU = async (
  id: number,
  data: Partial<Omit<SKU, "id" | "created_at" | "updated_at">>
): Promise<SKU> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteSKU = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
