// src/services/productService.ts
import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (data: Omit<Product, "id">) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: number, data: Partial<Product>) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
