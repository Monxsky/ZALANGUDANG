export async function updateStockTokopedia(sku: string, qty: number) {
  try {
    console.log(`Update stock Tokopedia: SKU=${sku}, QTY=${qty}`);
    return true;
  } catch (err) {
    console.error('Failed to update Tokopedia stock', err);
    throw err;
  }
}
