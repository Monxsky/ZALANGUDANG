// src/services/skuService.ts
import api from "./api";

export interface SKU {
  id: number;
  code: string;
  stock: number;
  productId: number;
}

export const getSKUs = async (): Promise<SKU[]> => {
  const res = await api.get("/skus");
  return res.data;
};

export const createSKU = async (data: Omit<SKU, "id">) => {
  const res = await api.post("/skus", data);
  return res.data;
};

export const updateSKU = async (data: Omit<SKU, "id">) => {
  const res = await api.post("/skus", data);
  return res.data;
};

export const deleteSKU = async (data: Omit<SKU, "id">) => {
  const res = await api.post("/skus", data);
  return res.data;
};
// updateSKU, deleteSKU serupa dengan productService
