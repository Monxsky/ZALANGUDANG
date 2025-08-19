import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { sku: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createNewTransaction = async (req: Request, res: Response) => {
  try {
    const { skuId, quantity, type } = req.body;
    const syncToMarketplace = type === 'OUT';

    const transaction = await prisma.transaction.create({
      data: { skuId, quantity, type, syncToMarketplace },
      include: { sku: true }
    });

    await prisma.sku.update({
      where: { id: skuId },
      data: {
        stock: type === 'IN'
          ? transaction.sku.stock + quantity
          : transaction.sku.stock - quantity
      }
    });

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
