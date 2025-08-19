// src/services/userService.ts
import api from "./api";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "staff";
}

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (user: Omit<User, "id">) => {
  const res = await api.post("/users", user);
  return res.data;
};

export const updateUser = async (id: number, user: Partial<User>) => {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
