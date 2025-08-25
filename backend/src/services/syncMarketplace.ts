import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function syncStock() {
  const transactions = await prisma.transaction.findMany({
    where: { syncToMarketplace: true },
    include: { sku: true }
  });

  for (const t of transactions) {
    console.log(`Sync SKU ${t.sku.code} with stock ${t.sku.stock} to marketplaces...`);
    // Di sini nanti bisa panggil API marketplace sebenarnya
  }

  console.log('Sync complete!');
}

syncStock()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
