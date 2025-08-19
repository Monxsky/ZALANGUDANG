import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllSKUs = async () => {
  return await prisma.sKU.findMany({ include: { product: true } });
};

export const createNewSKU = async (data: { code: string, stock: number, productId: number }) => {
  return await prisma.sKU.create({ data });
};
