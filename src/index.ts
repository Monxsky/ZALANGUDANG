import { createOutboxEvent } from './services/outboxService';
import { routeStock } from './services/warehouseRoutingService';

(async () => {
  try {
    // 1️⃣ Order dibuat → Sale event
    const orderSku = 'SKU-123';
    const orderQty = 60;

    // Routing multi-warehouse
    const allocation = await routeStock(orderSku, orderQty);
    console.log('Warehouse allocation for order:', allocation);

    // Push sale event ke outbox untuk tiap warehouse
    for (const a of allocation) {
      await createOutboxEvent('sale', {
        sku: orderSku,
        qty: a.allocated_qty,
        warehouse_id: a.warehouse_id
      });
    }

    // 2️⃣ Cancel (misal sebagian order dibatalkan)
    const cancelQty = 20;
    // Pilih warehouse dari alokasi (contoh: ambil dari warehouse pertama)
    const cancelWarehouseId = allocation[0].warehouse_id;

    await createOutboxEvent('cancel', {
      sku: orderSku,
      qty: cancelQty,
      warehouse_id: cancelWarehouseId
    });

    // 3️⃣ Refund (misal customer refund tanpa mengubah stok)
    const refundQty = 10;
    const refundWarehouseId = allocation[1].warehouse_id;

    await createOutboxEvent('refund', {
      sku: orderSku,
      qty: refundQty,
      warehouse_id: refundWarehouseId
    });

    console.log('All events pushed to outbox successfully');

  } catch (err) {
    console.error('Error processing order flow:');
  }
})();
