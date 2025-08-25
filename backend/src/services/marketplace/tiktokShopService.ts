export async function updateStockTikTokShop(sku: string, qty: number) {
  try {
    console.log(`Update stock TikTok Shop: SKU=${sku}, QTY=${qty}`);
    return true;
  } catch (err) {
    console.error('Failed to update TikTok Shop stock', err);
    throw err;
  }
}
