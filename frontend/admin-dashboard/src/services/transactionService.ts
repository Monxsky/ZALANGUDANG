// src/services/transactionService.ts
import api from "./api";

export interface Transaction {
  id: number;
  skuId: number;
  quantity: number;
  type: "IN" | "OUT";
  createdAt: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data;
};

export const createTransaction = async (data: Omit<Transaction, "id" | "createdAt">) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const deleteTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data;
};

export const updateTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data;
};