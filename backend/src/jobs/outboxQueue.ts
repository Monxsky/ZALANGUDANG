import { Queue, Worker, Job } from 'bullmq';
import connection from '../config/redis';
import { pool } from '../config/db'; // ✅ sudah konsisten
import { updateStockShopee } from '../services/marketplace/shopeeService';
import { updateStockTokopedia } from '../services/marketplace/tokopediaService';
import { updateStockTikTokShop } from '../services/marketplace/tiktokShopService';
import { revertStock } from '../services/stockService';
import logger from '../config/logger';

// Named export Queue & Worker
export const outboxQueue = new Queue('outbox', { connection });

export const worker = new Worker(
  'outbox',
  async (job: Job) => {
    const { id, event_type, payload, warehouse_id } = job.data;

    try {
      console.log(`Processing event ${event_type} for warehouse ${warehouse_id}`, payload);

      if (event_type === 'sale' || event_type === 'manual_update') {
        await updateStockShopee(payload.sku, payload.qty);
        await updateStockTokopedia(payload.sku, payload.qty);
        await updateStockTikTokShop(payload.sku, payload.qty);
      } else if (event_type === 'cancel') {
        await revertStock(payload.sku, payload.qty, payload.warehouse_id);
        await updateStockShopee(payload.sku, payload.qty);
        await updateStockTokopedia(payload.sku, payload.qty);
        await updateStockTikTokShop(payload.sku, payload.qty);
      } else if (event_type === 'refund') {
        console.log(`Refund event for SKU=${payload.sku}, QTY=${payload.qty}, no marketplace update`);
      }

      await pool.query(
        'UPDATE outbox SET status=$1 WHERE id=$2',
        ['processed', id]
      );

      logger.info('Event %s processed successfully', event_type);
      console.log(`Event ${event_type} processed successfully`);
    } catch (err) {
      console.error(`Failed to process event ${event_type}:`, err);
      logger.error('Failed to process event %s: %o', event_type, err);
      throw err; // BullMQ akan retry otomatis
    }
  },
  { connection }
);

worker.on('failed', (job, err) => {
  if (!job) return;
  if (job.attemptsMade >= 5) {
    logger.error(
      'Job %d failed after %d attempts: %s',
      job.id,
      job.attemptsMade,
      err.message
    );
  }
});
