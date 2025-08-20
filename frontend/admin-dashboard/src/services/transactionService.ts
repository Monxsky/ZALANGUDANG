import api from "./api";

export interface TransactionItem {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

export interface Transaction {
  id: number;
  totalPrice: number;
  createdAt: string;
  items: TransactionItem[];
}

export const saveTransaction = async (
  items: TransactionItem[]
): Promise<{ transactionId: number; message: string }> => {
  const res = await api.post("/transactions", { items });
  return res.data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data;
};

export const createTransaction = async (
  data: Omit<Transaction, "id" | "createdAt">
) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const updateTransaction = async (
  id: number,
  data: Partial<Transaction>
) => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: number) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};
