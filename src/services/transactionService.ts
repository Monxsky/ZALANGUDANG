import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTransaction = async (skuId: number, quantity: number, type: 'IN' | 'OUT') => {
  // Update stock
  const sku = await prisma.sKU.findUnique({ where: { id: skuId } });
  if (!sku) throw new Error('SKU not found');

  let newStock = sku.stock;
  if (type === 'IN') newStock += quantity;
  if (type === 'OUT') {
    if (quantity > sku.stock) throw new Error('Not enough stock');
    newStock -= quantity;
  }

  await prisma.sKU.update({
    where: { id: skuId },
    data: { stock: newStock },
  });

  // Create transaction record
  return await prisma.transaction.create({
    data: { skuId, quantity, type },
  });
};

export const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    include: { sku: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
};
