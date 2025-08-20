// src/services/productService.ts
import api from "./api";

export interface product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  sku?: string;
  stock?: number;
}

export const getProducts = async (): Promise<product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (product: Partial<product>) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const updateProduct = async (id: number, product: Partial<product>) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
