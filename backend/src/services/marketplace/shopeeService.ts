export async function updateStockShopee(sku: string, qty: number) {
  try {
    // TODO: ganti dengan API call Shopee resmi
    console.log(`Update stock Shopee: SKU=${sku}, QTY=${qty}`);
    return true;
  } catch (err) {
    console.error('Failed to update Shopee stock', err);
    throw err;
  }
}
