import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ambil semua SKU
  const skus = await prisma.sKU.findMany();

  const transactionsData = skus.flatMap((sku) => [
    { skuId: sku.id, quantity: 50, type: 'IN' },
    { skuId: sku.id, quantity: 20, type: 'OUT' },
  ]);

  for (const t of transactionsData) {
    // Update stock otomatis
    const sku = await prisma.sKU.findUnique({ where: { id: t.skuId } });
    if (!sku) continue;

    let newStock = sku.stock;
    if (t.type === 'IN') newStock += t.quantity;
    if (t.type === 'OUT') newStock -= t.quantity;

    await prisma.sKU.update({
      where: { id: t.skuId },
      data: { stock: newStock },
    });

    await prisma.transaction.create({ data: t});
  }

  console.log('Seed transaksi & stock movement berhasil dibuat!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
