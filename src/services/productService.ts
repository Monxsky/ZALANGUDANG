import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany({ include: { sku: true } });
};

export const createNewProduct = async (data: { name: string, description?: string, price: number }) => {
  return await prisma.product.create({ data });
};
