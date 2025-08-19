// src/jobs/stockSyncJob.ts
import { PrismaClient } from '@prisma/client';
import { syncStockToMarketplaces } from '../services/marketplaceService';

const prisma = new PrismaClient();

export const stockSyncJob = async () => {
  const products = await prisma.product.findMany();
  for (const p of products) {
    await syncStockToMarketplaces(p.id, 100); // dummy stock
  }
};
